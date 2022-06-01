function Services() {
  this.getListTeacherApi = function () {
    return axios({
      url: "https://628b9961667aea3a3e32d1c5.mockapi.io/api/teachers",
      method: "GET",
    });
  };

  this.deleteTeacherApi = function (id) {
    return axios({
      url: `https://628b9961667aea3a3e32d1c5.mockapi.io/api/teachers/${id}`,
      method: "DELETE",
    });
  };

  this.addTeacherApi = function (teacher) {
    return axios({
      url: "https://628b9961667aea3a3e32d1c5.mockapi.io/api/teachers",
      method: "POST",
      data: teacher,
    });
  };

  this.getTeacherById = function (id) {
    return axios({
      url: `https://628b9961667aea3a3e32d1c5.mockapi.io/api/teachers/${id}`,
      method: "GET",
    });
  };

  this.updateTeacherById = function (teacher) {
    return axios({
      url: `https://628b9961667aea3a3e32d1c5.mockapi.io/api/teachers/${teacher.id}`,
      method: "PUT",
      data: teacher,
    });
  };
}
