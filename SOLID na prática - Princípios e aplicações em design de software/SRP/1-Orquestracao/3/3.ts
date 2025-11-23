class FileUploadService {
  uploadFile(file: Buffer, destination: string) {
    // Compressão do arquivo
    const compressedFile = this.compressFile(file);

    // Envio do arquivo
    console.log(`Enviando arquivo para ${destination}`);
  }

  private compressFile(file: Buffer): Buffer {
    console.log("Comprimindo arquivo...");
    return file.slice(0, file.length / 2); // Exemplo de compressão
  }
}
