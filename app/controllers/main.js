var service = new Services();
var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}
/**
 * Câu 5: Sử dụng Axios để xây dựng các chức năng cho admin (hiện danh sách, thêm, xóa, cập nhật
người dùng)
 */
// Lấy danh sách từ server về
getEle("btnHienThiDS").onclick = function () {
  getListTeacher();
};
function getListTeacher() {
  service
    .getListTeacherApi()
    .then(function (result) {
      renderListTeacher(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function renderListTeacher(data) {
  var contentHTML = "";
  data.forEach(function (teacher, index) {
    contentHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${teacher.taiKhoan}</td>
            <td>${teacher.matKhau}</td>
            <td>${teacher.hoTen}</td>
            <td>${teacher.email}</td>
            <td>${teacher.ngonNgu}</td>
            <td>${teacher.loaiND}</td>
            <td>
                <button class = "btn btn-info" data-toggle="modal"
                data-target="#myModal" onclick = "editTeacher(${
                  teacher.id
                })">Sửa</button>
                <button class = "btn btn-danger" onclick = "deleteTeacher(${
                  teacher.id
                })">xóa</button>
            </td>
        </tr>`;
  });
  getEle("tblDanhSachNguoiDung").innerHTML = contentHTML;
}

/**
 * Xóa người dùng
 */
function deleteTeacher(id) {
  service
    .deleteTeacherApi(id)
    .then(function () {
      getListTeacher();
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Nhấn nút thêm mới
 */
getEle("btnThemNguoiDung").onclick = function () {
  // đổi tên tiêu đề
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Thêm người dùng";
  // thêm nút add
  var footer = `<button class="btn btn-primary" onclick = "addTeacher()">Add</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
};

/**
 * Thêm người dùng
 */
function addTeacher() {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var moTa = getEle("MoTa").value;
  var hinhAnh = getEle("HinhAnh").value;

  
  var letter =
    "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
  var password =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;
  var Email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // flag (cờ) isValid true: hợp lệ / false: không hợp lệ
  var isValid = true;

  isValid &= validation.kiemTraRong(
        taiKhoan,
        "tbTK",
        "*Vui lòng nhập tài khoản"
      ) 
      // && validation.kiemTraTaiKhoan(taiKhoan, "tbTK", "*Tài khoản đã tồn tại", )
      ;  

  isValid &=
    validation.kiemTraRong(hoTen, "tbTen", "*Vui lòng nhập tên") &&
    validation.kiemTraKieuDL(
      hoTen,
      letter,
      "tbTen",
      "*Vui lòng chỉ nhập chữ cái không chưa số và ký tự đặc biệt"
    );

  isValid &=
    validation.kiemTraRong(matKhau, "tbMatKhau", "*Vui lòng nhập mật khẩu") &&
    validation.kiemTraKieuDL(
      matKhau,
      password,
      "tbMatKhau",
      "*Vui lòng nhập mật khẩu từ 6-8 ký tự chứa ít nhất 1 ký tự viết Hoa, số, ký tự đặc biệt"
    );

  isValid &=
    validation.kiemTraRong(email, "tbEmail", "*Vui lòng nhập email") &&
    validation.kiemTraKieuDL(
      email,
      Email,
      "tbEmail",
      "*Vui lòng nhập đúng kiểu email (Ví dụ: cuong96@gmail.com)"
    );

  isValid &= validation.kiemTraRong(
    hinhAnh,
    "tbHinhAnh",
    "*Vui lòng nhập link hình ảnh"
  );

  isValid &= validation.kiemTraChon(
    "loaiNgonNgu",
    "tbLoaiNN",
    "*Vui lòng chọn ngôn ngữ"
  );

  isValid &= validation.kiemTraChon(
    "loaiNguoiDung",
    "tbLoaiND",
    "*Vui lòng chọn người dùng"
  );

  isValid &=
    validation.kiemTraRong(moTa, "tbMoTa", "*Vui lòng nhập mô tả") &&
    validation.kiemTraDoDaiKyTu(
      moTa,
      "tbMoTa",
      "*Vui lòng nhập mô tả dưới 60 ký tự",
      60,
      1
    );

  // check isValid
  if (!isValid) return;

  // tạo lớp đối tượng
  var teacher = new Teacher(
    "",
    taiKhoan,
    hoTen,
    matKhau,
    email,
    ngonNgu,
    loaiND,
    moTa,
    hinhAnh
  );
  service
    .addTeacherApi(teacher)
    .then(function () {
      // render table
      getListTeacher();
      // close modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Sửa người dùng
 */
function editTeacher(id) {
  // đổi tên tiêu đề
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Cập nhật người dùng";
  // thêm nút add
  var footer = `<button class="btn btn-primary"  onclick = "updateTeacher(${id})">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

  service
    .getTeacherById(id)
    .then(function (result) {
      getEle("TaiKhoan").value = result.data.taiKhoan;
      getEle("HoTen").value = result.data.hoTen;
      getEle("MatKhau").value = result.data.matKhau;
      getEle("Email").value = result.data.email;
      getEle("loaiNgonNgu").value = result.data.ngonNgu;
      getEle("loaiNguoiDung").value = result.data.loaiND;
      getEle("MoTa").value = result.data.moTa;
      getEle("HinhAnh").value = result.data.hinhAnh;
      // khóa nút tài khoản
      getEle("TaiKhoan").disabled = true;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Update người dùng
 */
function updateTeacher(id) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var moTa = getEle("MoTa").value;
  var hinhAnh = getEle("HinhAnh").value;

  var letter =
    "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
  var password =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/;
  var Email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // flag (cờ) isValid true: hợp lệ / false: không hợp lệ
  var isValid = true;

  isValid &= validation.kiemTraRong(
        taiKhoan,
        "tbTK",
        "*Vui lòng nhập tài khoản"
      );  

  isValid &=
    validation.kiemTraRong(hoTen, "tbTen", "*Vui lòng nhập tên") &&
    validation.kiemTraKieuDL(
      hoTen,
      letter,
      "tbTen",
      "*Vui lòng chỉ nhập chữ cái không chưa số và ký tự đặc biệt"
    );

  isValid &=
    validation.kiemTraRong(matKhau, "tbMatKhau", "*Vui lòng nhập mật khẩu") &&
    validation.kiemTraKieuDL(
      matKhau,
      password,
      "tbMatKhau",
      "*Vui lòng nhập mật khẩu từ 6-8 ký tự chứa ít nhất 1 ký tự viết Hoa, số, ký tự đặc biệt"
    );

  isValid &=
    validation.kiemTraRong(email, "tbEmail", "*Vui lòng nhập email") &&
    validation.kiemTraKieuDL(
      email,
      Email,
      "tbEmail",
      "*Vui lòng nhập đúng kiểu email (Ví dụ: cuong96@gmail.com)"
    );

  isValid &= validation.kiemTraRong(
    hinhAnh,
    "tbHinhAnh",
    "*Vui lòng nhập link hình ảnh"
  );

  isValid &= validation.kiemTraChon(
    "loaiNgonNgu",
    "tbLoaiNN",
    "*Vui lòng chọn ngôn ngữ"
  );

  isValid &= validation.kiemTraChon(
    "loaiNguoiDung",
    "tbLoaiND",
    "*Vui lòng chọn người dùng"
  );

  isValid &=
    validation.kiemTraRong(moTa, "tbMoTa", "*Vui lòng nhập mô tả") &&
    validation.kiemTraDoDaiKyTu(
      moTa,
      "tbMoTa",
      "*Vui lòng nhập mô tả dưới 60 ký tự",
      60,
      1
    );

  // check isValid
  if (!isValid) return;

  var teacher = new Teacher(
    id,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    ngonNgu,
    loaiND,
    moTa,
    hinhAnh
  );

  service
    .updateTeacherById(teacher)
    .then(function () {
      getListTeacher();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
