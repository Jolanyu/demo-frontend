import { ref } from "vue";

const dialogVisible = ref(false);
const resetForm = formRef => {
  formRef.resetFields();
  dialogVisible.value = false;
};

const deepClone = obj => {
  return JSON.parse(JSON.stringify(obj));
};

const rules = {
  name: [
    {
      required: true,
      message: "请输入姓名",
      trigger: "blur",
    },
    {
      min: 2,
      max: 10,
      message: "长度不符合要求",
      trigger: "blur",
    },
  ],
  grade: [
    {
      required: true,
      message: "请选择班级",
      trigger: ["blur", "change"],
    },
  ],
  role: [
    {
      required: true,
      message: "请选择管理员角色",
      trigger: "blur",
    },
  ],
  gender: [
    {
      required: true,
      message: "请选择性别",
      trigger: ["blur", "change"],
    },
  ],
  credit: [
    {
      required: true,
      message: "信用值不能为空",
      trigger: ["blur", "change"],
    },
    {
      pattern: /^(0|[1-9]\d?|100)$/,
      message: "信用值范围0-100",
      trigger: ["blur", "change"],
    },
  ],
  bookName: [
    {
      required: true,
      message: "请输入书名",
      trigger: "blur",
    },
  ],
  bookAuthor: [
    {
      required: true,
      message: "请输入作者",
      trigger: "blur",
    },
  ],
  bookIsbn: [
    {
      required: false,
      message: "请输入Isbn",
      trigger: "blur",
    },
  ],
  bookCategory: [
    {
      required: true,
      message: "请输入类别",
      trigger: "blur",
    },
  ],
  bookPublisher: [
    {
      required: true,
      message: "请输入出版社",
      trigger: "blur",
    },
  ],
  gradeId: [
    {
      required: true,
      message: "信用值不能为空",
      trigger: ["blur", "change"],
    },
    {
      len: 4,
      message: "班级编号不合法",
      trigger: ["blur", "change"],
    },
  ],
};

export { rules, resetForm, dialogVisible, deepClone };
