/**
 * Câu 6: Validation:
• Tài Khoản (username): không được để trống, không được trùng
• Họ tên: không được để trống, không chứa số và ký tự đặc biệt
• Mật khẩu: không được để trống, dúng format (có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự
số, độ dài 6-8)
• Email: không được để trống, đúng format email
• Hinh anh: không được để trống
• Loại người dùng: phải chọn
• Loại ngôn ngữ: phải chọn
• Mô tả: không được để trống, không vượt quá 60 ký tự
 */
function Validation() {
  this.kiemTraRong = function (value, errorID, mess) {
    // Check validation
    if (value === "") {
      // error
      getEle(errorID).style.display = "block";
      getEle(errorID).innerHTML = mess;
      return false;
    }
    getEle(errorID).style.display = "none";
    getEle(errorID).innerHTML = "";
    return true;
  };
  this.kiemTraTaiKhoan = function (value, errorID, mess, arr) {
    var isStatus = true;
    arr.forEach(function (item) {
      if (item.taiKhoan === value) {
        isStatus = false;
      }
    });
    if (isStatus) {
      getEle(errorID).style.display = "none";
      getEle(errorID).innerHTML = "";
      return true;
    }
    getEle(errorID).style.display = "block";
    getEle(errorID).innerHTML = mess;
    return false;
  };

  this.kiemTraChon = function (selectId, errorID, mess) {
    if (getEle(selectId).selectedIndex !== 0) {
      getEle(errorID).style.display = "none";
      getEle(errorID).innerHTML = "";
      return true;
    }
    getEle(errorID).style.display = "block";
    getEle(errorID).innerHTML = mess;
    return false;
  };

  this.kiemTraDoDaiKyTu = function (value, errorID, mess, max, min) {
    if (value.trim().length >= min && value.trim().length <= max) {
      getEle(errorID).style.display = "none";
      getEle(errorID).innerHTML = "";
      return true;
    }
    getEle(errorID).style.display = "block";
    getEle(errorID).innerHTML = mess;
    return false;
  };

  this.kiemTraKieuDL = function (value, check, errorID, mess) {
    if (value.match(check)) {
      getEle(errorID).style.display = "none";
      getEle(errorID).innerHTML = "";
      return true;
    }
    getEle(errorID).style.display = "block";
    getEle(errorID).innerHTML = mess;
    return false;
  };
}
