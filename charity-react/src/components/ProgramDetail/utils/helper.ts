export function maskAccountNumber(accountNumber: string): string {
  return (
    accountNumber.slice(0, 4) + // Lấy 4 ký tự đầu
    '***' + // Thay thế 3 ký tự tiếp theo bằng ***
    accountNumber.slice(7) // Giữ lại phần còn lại từ vị trí thứ 7 trở đi
  )
}

export function formatVND(amount: number): string {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}
