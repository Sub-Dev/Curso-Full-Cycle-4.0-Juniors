class FileProcessor {
  processFile(file: string) {
    console.log(`Lendo arquivo CSV: ${file}`);
    const data = [{ name: "Alice", value: 100 }]; // Dados simulados

    // Exportar JSON
    const jsonReport = JSON.stringify(data);
    console.log(`Exportando relatório em JSON: ${jsonReport}`);
  }
}
