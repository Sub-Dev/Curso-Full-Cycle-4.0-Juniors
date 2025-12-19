package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"
	"time"

	httpapi "github.com/danielgundim/finance-tracker/internal/http"
	"github.com/danielgundim/finance-tracker/internal/finance"

	_ "github.com/jackc/pgx/v5/stdlib" // driver pgx para database/sql
)

func main() {
	addr := getenv("HTTP_ADDR", ":8080")
	storage := getenv("STORAGE", "memory") // "postgres" | "memory"

	var repo finance.Repository
	if storage == "postgres" {
		dsn := mustGet("DATABASE_URL") // ex: postgres://user:pass@host:5432/db?sslmode=require
		db, err := sql.Open("pgx", dsn)
		if err != nil {
			log.Fatalf("open db: %v", err)
		}
		db.SetMaxOpenConns(10)
		db.SetMaxIdleConns(10)
		db.SetConnMaxLifetime(30 * time.Minute)
		if err := db.Ping(); err != nil {
			log.Fatalf("ping db: %v", err)
		}
		repo = finance.NewPostgresRepo(db)
		log.Println("storage=postgres connected")
	} else {
		repo = finance.NewMemoryRepo()
		log.Println("storage=memory")
	}

	svc := finance.NewService(repo)
	mux := httpapi.NewMux(svc)

	srv := &http.Server{
		Addr:              addr,
		Handler:           mux,
		ReadHeaderTimeout: 5 * time.Second,
	}

	log.Printf("listening on %s", addr)
	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("server error: %v", err)
	}
}

func getenv(k, def string) string {
	if v := os.Getenv(k); v != "" {
		return v
	}
	return def
}

func mustGet(k string) string {
	v := os.Getenv(k)
	if v == "" {
		log.Fatalf("missing required env var: %s", k)
	}
	return v
}
