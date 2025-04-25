import { FC, useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface ImageUploadProps {
  onChange?: (file: File) => void
  value?: File
}

const ImageUpload: FC<ImageUploadProps> = ({ onChange, value }) => {
  const [image, setImage] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const previewFile = URL.createObjectURL(file)
      setImage(previewFile)
      if (onChange) {
        onChange(file)
      }
    }
  }, [])

  useEffect(() => {
    if (value) {
      const imageUrl = URL.createObjectURL(value)
      setImage(imageUrl)
    }
  }, [value])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [], // Chấp nhận mọi loại ảnh
    },
    multiple: false,
  })

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #ccc',
          borderRadius: 10,
          padding: 20,
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Thả ảnh vào đây...</p>
        ) : (
          <p>Kéo và thả ảnh vào đây, hoặc bấm để chọn</p>
        )}
      </div>

      {image && (
        <div style={{ marginTop: 20 }}>
          <img
            src={image}
            alt="preview"
            className="max-w-80 max-h-80 rounded-md"
          />
        </div>
      )}
    </div>
  )
}

export default ImageUpload
