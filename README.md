# ViewLife Sales OS

Dashboard tĩnh, triển khai trực tiếp bằng GitHub Pages. Không cần build hoặc cài dependency.

## Deploy

1. Mở repository trên máy và kiểm tra `index.html`.
2. Commit và push lên nhánh đang được GitHub Pages sử dụng (thường là `main`).
3. Trong GitHub: **Settings → Pages → Deploy from a branch**, chọn nhánh và thư mục `/ (root)`.

## Data và backup

- Dữ liệu được lưu trong `localStorage` của trình duyệt; mỗi trình duyệt/thiết bị có bộ dữ liệu riêng.
- Dùng **Export backup** để tải JSON trước khi xóa cache hoặc đổi máy.
- Bản này dùng namespace mới `viewlife_sales_os_v31`, nên không ghi đè dữ liệu của dashboard cũ.

## Bitrix24

- Weekly Report được sinh tự động từ Activity, Opportunity và Order/PO.
- Khuyến nghị dùng **Download JSON payload** rồi chuyển payload qua Bitrix automation hoặc một serverless proxy.
- Không đưa webhook có secret vào source GitHub Pages. Nếu nhập webhook trong UI, URL chỉ được lưu trong trình duyệt hiện tại.
- Endpoint và `fields` cụ thể có thể cần đổi theo loại webhook Bitrix24 của công ty (`tasks.task.add`, CRM activity, hoặc workflow automation).

## Pricing v3.1 guardrails

Product Master hiển thị tách biệt:

- List Price (excl. VAT).
- Walk-in Price (incl. VAT, thay đổi theo số lượng và discount).
- Online/Shopee SRP (incl. VAT).
- Floor Price (excl. VAT).

Giá chuẩn cập nhật theo bảng giá kênh mới:

| Model | List excl. VAT | Auth Base | Gold Base | Plat+100 | Online incl. VAT |
|---|---:|---:|---:|---:|---:|
| G5400 | 7,150,000 | 6,792,500 | 6,292,000 | 6,006,000 | 8,216,208 |
| N5095-Touch | 9,100,000 | 8,645,000 | 8,008,000 | 7,644,000 | 10,456,992 |
| 1315U | 12,950,000 | 12,302,500 | 11,396,000 | 10,878,000 | 14,881,104 |
| 1345U-optional | 15,950,000 | 15,152,500 | 14,036,000 | 13,398,000 | 18,328,464 |
| 1345U-Black 256 | 13,650,000 | 12,967,500 | 12,012,000 | 11,466,000 | 15,685,488 |
| 1345U-Black 512 | 17,700,000 | 16,815,000 | 15,576,000 | 14,868,000 | 20,339,424 |

Walk-in không hợp đồng dùng công thức `List × (1 − discount) × 1.08`:

- 1–10 máy: mặc định 0%, tối đa 2%.
- 11–30 máy: mặc định 2%, tối đa 4%.
- 31–50 máy: mặc định 3%, tối đa 5%.
- Trên 50 máy: phải ký hợp đồng và chuyển sang Authorized tier.

Một order được đánh dấu exception nếu vi phạm bất kỳ điều kiện nào:

- Unit price thấp hơn floor price của Product Master.
- Discount cao hơn maximum discount của SKU.
- Gross margin thấp hơn ngưỡng governance (mặc định 10%).

Các exception xuất hiện trong Governance Dashboard và Weekly Report.
