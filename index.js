//Bài tập 1
/**
 *
 * @param {*} thuNhapNNT_TS Lấy thu nhập
 * @param {*} nPhuThuocNNT_TS lấy số người phụ thuộc
 * @returns TNCN
 * Tính TNCT=Thu nhập cả năm-4tr-số người phụ thuộc*1.6tr
 * Dựa vào TNCT so với bảng lũy tiến tính thu nhập cá nhân => TNCN
 */
function tinhTNCN(thuNhapNNT_TS, nPhuThuocNNT_TS) {
  var thuNhapNNT = Number(document.getElementById(thuNhapNNT_TS).value);
  var nPhuThuocNNT = Number(document.getElementById(nPhuThuocNNT_TS).value);
  var TNCT = 0;
  var TNCN = 0;
  TNCT = thuNhapNNT - 4e6 - nPhuThuocNNT * 1.6e6;
  if (TNCT <= 60e6) {
    TNCN = TNCT * 0.05;
  } else if (TNCT > 60e6 && TNCT <= 120e6) {
    TNCN = 60e6 * 0.05 + (TNCT - 60e6) * 0.1;
  } else if (TNCT > 120e6 && TNCT <= 210e6) {
    TNCN = 60e6 * 0.05 + 60e6 * 0.1 + (TNCT - 120e6) * 0.15;
  } else if (TNCT > 210e6 && TNCT <= 384e6) {
    TNCN = 60e6 * 0.05 + 60e6 * 0.1 + 90e6 * 0.15 + (TNCT - 210e6) * 0.2;
  } else if (TNCT > 384e6 && TNCT <= 624e6) {
    TNCN =
      60e6 * 0.05 +
      60e6 * 0.1 +
      90e6 * 0.15 +
      174e6 * 0.2 +
      (TNCT - 384e6) * 0.25;
  } else if (TNCT > 624e6 && TNCT <= 960e6) {
    TNCN =
      60e6 * 0.05 +
      60e6 * 0.1 +
      90e6 * 0.15 +
      174e6 * 0.2 +
      240e6 * 0.25 +
      (TNCT - 624e6) * 0.3;
  } else if (TNCT > 960e6) {
    TNCN =
      60e6 * 0.05 +
      60e6 * 0.1 +
      90e6 * 0.15 +
      174e6 * 0.2 +
      240e6 * 0.25 +
      336e6 * 0.3 +
      (TNCT - 960e6) * 0.35;
  } else {
    TNCN = 0;
  }
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(TNCN);
}
/**
 * ++Input:
 * nameNNT:string;
 * thueTNCN:number tính bằng hàm tinhTNCN
 * ++Output
 * outputBT1 => xuất Tên+thuế TNCN cho user
 */
document.getElementById("tinhBT1").onclick = function () {
  var nameNNT = document.getElementById("nameNNT").value;
  var thueTNCN = tinhTNCN("thuNhapNNT", "nPhuThuocNNT");
  document.getElementById("outputBT1").innerHTML =
    "Tên người nộp thuế: " +
    nameNNT +
    " .Số tiền thuế TNCN phải nộp= " +
    thueTNCN;
};
//Bài tập 2
/**
 * 
 * @param {*} loaiKH_TS Lấy loại khách hàng
 * @param {*} soKenh_TS Lấy số lênh
 * @param {*} soKetNoi_TS Lấy số kết nối đối với khách hàng doanh nghiệp
 * @returns tienCap
 * Nếu là nhà dân
 *   +Phí xử lý hóa đơn: 4.5$
     +Phí dịch vụ cơ bản: 20.5$
     +Thuê kênh cao cấp: 7.5$ / kênh
   Nếu là doanh nghiệp
     +Phí xử lý hóa đơn: 15$
     +Phí dịch vụ cơ bản: 75$ cho tổng 10 kết nối đầu,  mỗi kết nối thêm 5$ / kết nối
     +Thuê kênh cao cấp: 50$ / kênh
 */
function tinhTienCap(loaiKH_TS, soKenh_TS, soKetNoi_TS) {
  var loaiKH = document.getElementById(loaiKH_TS).value;
  var soKenh = Number(document.getElementById(soKenh_TS).value);
  var soKetNoi = Number(document.getElementById(soKetNoi_TS).value);
  var tienCap = 0;

  if (loaiKH == "nhaDan") {
    tienCap = 4.5 + 20.5 + 7.5 * soKenh;
  } else if (loaiKH == "doanhNghiep") {
    if (soKetNoi <= 10) {
      tienCap = 15 + 75 + 50 * soKenh;
    } else if (soKetNoi > 10) {
      tienCap = 15 + 75 + (soKetNoi - 10) * 5 + 50 * soKenh;
    }
  } else {
    tienCap = 0;
  }
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(tienCap);
}
//Ẩn hiện ô nhập cổng kết nối theo loại khách hàng
function toggleSoKN() {
  var loaiKH = document.getElementById("loaiKH").value;
  var soKetNoi = document.getElementById("soKetNoi");
  if (loaiKH == "nhaDan" || loaiKH == "") {
    soKetNoi.style.display = "none";
  } else if (loaiKH == "doanhNghiep") {
    soKetNoi.style.display = "inline-block";
  }
}
/**
 * ++Input:
 * maKH:string;
 * tienCap:number tính theo hàm tinhTienCap()
 * ++Output:
 * outputBT2=>trả về mã khách hàng và tiền cáp
 * chú ý:nếu user ko chọn loại khách hàng thì hiện ra thông báo "vui lòng nhập..."
 */
document.getElementById("tinhBT2").onclick = function () {
  var maKH = document.getElementById("maKH").value;
  var tienCap = 0;
  tienCap = tinhTienCap("loaiKH", "soKenh", "soKetNoi");
  if (tienCap == "$0.00") {
    document.getElementById("outputBT2").innerHTML =
      "Mã khách hàng: " +
      maKH +
      " .Tiền cáp là " +
      tienCap +
      " (Vui lòng chọn loại khách hàng)";
  } else {
    document.getElementById("outputBT2").innerHTML =
      "Mã khách hàng: " + maKH + " ;Tiền cáp là " + tienCap;
  }
};
