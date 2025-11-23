class FileCompressor {
  compress(file: Buffer): Buffer {
    console.log("Comprimindo arquivo...");
    return file.slice(0, file.length / 2);
  }
}

class CloudUploader {
  upload(file: Buffer, destination: string) {
    console.log(`Enviando arquivo para ${destination}`);
  }
}

class FileUploadService {
  constructor(
    private compressor: FileCompressor,
    private uploader: CloudUploader
  ) {}

  uploadFile(file: Buffer, destination: string) {
    const compressedFile = this.compressor.compress(file);
    this.uploader.upload(compressedFile, destination);
  }
}
