import { ref } from "vue";
const currentPage = ref();
const total = ref(0);

const getCount = service => {
  service.getCount().then(res => {
    total.value = res.data.count;
  });
};

const changePage = (e, action) => {
  currentPage.value = e;
  action(e);
};

export { currentPage, changePage, getCount, total };
