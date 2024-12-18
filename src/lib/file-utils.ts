export interface FileValidationConfig {
  maxFiles: number
  maxSize: number
  acceptedFileTypes: string[]
}

export function validateFiles(
  files: File[],
  config: FileValidationConfig,
): string[] {
  const errors: string[] = []
  if (!files || files.length === 0) return errors
  files.forEach(file => {
    if (file.size > config.maxSize) {
      errors.push(`${file.name} exceeds the maximum file size.`)
    }
    if (!config.acceptedFileTypes.includes(file.type)) {
      errors.push(
        `${file.name} has an invalid file type. Allowed types: ${config.acceptedFileTypes.join(
          ', ',
        )}`,
      )
    }
  })
  return errors
}
