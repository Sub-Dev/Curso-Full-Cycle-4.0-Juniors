package finance

import (
	"context"
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"
)

var (
	ErrNotFound   = errors.New("not found")
	ErrBadRequest = errors.New("bad request")
)

type Repository interface {
	Create(ctx context.Context, t *Transaction) error
	ListByPeriod(ctx context.Context, from, to time.Time) ([]Transaction, error)
	Delete(ctx context.Context, id uuid.UUID) error
	MonthlySummary(ctx context.Context, year int, month int) (*MonthlySummary, error)
}

type Service struct {
	repo Repository
}

func NewService(r Repository) *Service { return &Service{repo: r} }

func (s *Service) Create(ctx context.Context, typ TxType, category string, amountCents int64, desc string) (*Transaction, error) {
	if typ != Income && typ != Expense {
		return nil, ErrBadRequest
	}
	category = strings.TrimSpace(category)
	if category == "" || amountCents <= 0 {
		return nil, ErrBadRequest
	}
	now := time.Now().UTC()
	tx := &Transaction{
		ID:          uuid.New(),
		Type:        typ,
		Category:    category,
		AmountCents: amountCents,
		OccurredAt:  now,
		Description: strings.TrimSpace(desc),
		CreatedAt:   now,
		UpdatedAt:   now,
	}
	if err := s.repo.Create(ctx, tx); err != nil {
		return nil, err
	}
	return tx, nil
}

func (s *Service) ListByPeriod(ctx context.Context, from, to time.Time) ([]Transaction, error) {
	if to.Before(from) {
		return nil, ErrBadRequest
	}
	return s.repo.ListByPeriod(ctx, from.UTC(), to.UTC())
}

func (s *Service) Delete(ctx context.Context, id uuid.UUID) error {
	return s.repo.Delete(ctx, id)
}

func (s *Service) MonthlySummary(ctx context.Context, year int, month int) (*MonthlySummary, error) {
	if month < 1 || month > 12 {
		return nil, ErrBadRequest
	}
	return s.repo.MonthlySummary(ctx, year, month)
}
