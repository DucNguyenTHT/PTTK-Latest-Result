exports.Admin = [
    {
        icon : 'fas fa-user-edit',
        title: 'Quản Lý Sinh Viên',
        link : '/crudstudent'
    },
    {
        icon : 'fas fa-user-edit',
        title: 'Quản Lý Giáo Viên',
        link : '/crudteacher'
    },
    {
        icon : 'fas fa-user-edit',
        title: 'Quản Lý khoa',
        link : '/cruddepartment'
    },
    {
        icon : 'fas fa-user-edit',
        title: 'Quản Lý Ngành',
        link : '/crudmajor'
    },
    {
        icon : 'fas fa-user-edit',
        title: 'Sinh Viên theo Ngành',
        link : '/slmajorstudent'
    },
    {
        icon : 'fas fa-user-edit',
        title: 'Giáo Viên Theo Khoa',
        link : '/sldepartmentteacher'
    },
    {
        icon : 'fas fa-user-edit',
        title: 'Giáo Viên Theo Khoa',
        link : '/registerstatus'
    },
]
exports.Teacher = [
    {
        icon : 'fas fa-pen-square',
        title: 'Cập Nhật Đề Tài',
        link : '/crudtopic'
    },
    {
        icon : 'far fa-clipboard',
        title: 'Duyệt Đăng Ký',
        link : '/acceptregister'
    },
]

exports.student = [
    {
        icon : 'fas fa-address-book',
        title: 'Đăng ký đề tài',
        link : '/studentregistertopic'
    },
]