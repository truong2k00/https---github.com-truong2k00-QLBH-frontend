<template>
  <v-card>
    <v-cart style="card-header fill-height height">
      <VRow>
        <VCol cols="8">
          <span style="height: 2em">
            <h2 style="margin-left: 18px">{{ pageName }}</h2>
          </span>
        </VCol>
        <VCol cols="4">
          <div>
            <VBtn
              append-icon="mdi-new-box"
              prepend-icon="mdi-plus-thick"
              color="green-lighten-1"
              style="position: absolute; right: 0"
            >
              <template v-slot:prepend>
                <v-icon color="success"></v-icon>
              </template>
              Add New Product
            </VBtn>
          </div>
        </VCol>
      </VRow>
    </v-cart>
    <div class="card-header fill-height height">
      <v-row>
        <v-col class="search-area" cols="3">
          <v-text-field
            v-model="queryParams.searchText"
            placeholder="Search..."
            variant="solo"
            @blur="onSearchInputBlur"
          />
        </v-col>
        <v-col class="filter-area" cols="9">
          <v-row>
            <VCol cols="6">
              <VCombobox
                v-model="queryParams.categoryIds"
                multiple
                clearable
                item-title="title"
                item-value="value"
                :items="categoryDatasource"
                @update:modelValue="onCategoryDropdownChanged"
              />
            </VCol>
            <v-col cols="6">
              <v-combobox
                v-model="queryParams.status"
                clearable
                item-title="title"
                item-value="value"
                :items="statusDatasource"
                @update:modelValue="onStatusDropdownChanged"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <div class="card-body">
      <!-- <VDataTable :items="tableConfig.data"></VDataTable> -->
      <VDataTable
        ref="table"
        :headers="tableConfig.headers"
        :items="tableConfig.data"
        :items-per-page="tableConfig.pagination.pageSize"
      >
        <template #item.imageProduct="{ item }">
          <img
            v-if="
              item.row &&
              item.row.imageProduct &&
              item.row.imageProduct.length > 0
            "
            :src="item.row.imageProduct[0].imageUrl"
            alt="Hình ảnh"
            style="max-width: 100px; max-height: 100px"
          />
          <img
            v-else
            src=""
            alt="Hình null"
            style="max-width: 100px; max-height: 100px"
          />
        </template>
        <template #item.action="{ item }">
          <VBtn
            color="cyan-accent-4"
            icon="mdi-pencil"
            density="compact"
            @click="DELETE_PRODUCT(item.row)"
          ></VBtn>
          <VBtn color="red" icon="mdi-trash-can" density="compact"></VBtn>
        </template>
      </VDataTable>
    </div>
    <div class="card-footer"></div>
  </v-card>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ProductServices from '../../Services/ProductServces/ProductServices';

const queryParams: ISanPhamQueryParams = ref<ISanPhamQueryParams>({});
const categoryDatasource = ref([]);
const statusDatasource = ref([
  {
    title: 'Active',
    value: true,
  },
  {
    title: 'Inactive',
    value: false,
  },
]);
const tableConfig = ref({
  headers: [
    { title: '', key: 'data-table-expand' },
    { title: 'Sản Phẩm ID', key: 'productID' },
    { title: 'Người tạo', key: 'username' },
    { title: 'Image', key: 'imageProduct' },
    { title: 'Tên Sản Phẩm', key: 'product_Name' },
    { title: 'Giá Bán', key: 'price' },
    { title: 'Số Lượng', key: 'quantity' },
    { title: 'Thao tác', key: 'action' },
  ],
  data: [],
  pagination: {
    pageNo: 1,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20, 50],
    totalPages: 1,
    totalItems: 1,
  },
});
const loadData = async () => {
  const res = await ProductServices.GetAll();
  tableConfig.value.data = res;
  console.log(tableConfig);
};
const DELETE_PRODUCT = param => {
  console.log('s');
};
onMounted(() => {
  loadCategory();
  loadCategory();
  loadTableData();
  DELETE_PRODUCT;
  loadData();
});

const loadCategory = () => {
  try {
    categoryDatasource.value = [
      {
        value: 1,
        title: 'Sample',
      },
      {
        value: 2,
        title: 'Minh Nghe',
      },
    ];
  } catch (err) {
    console.log(err);
  }
};

const loadTableData = () => {
  const param = {
    searchText: queryParams.value.searchText,
    categoryIds: queryParams.value.categoryIds,
    status: queryParams.value.status,
  };
  console.log(param);
};

const onSearchInputBlur = () => {
  console.log(queryParams.value);
  loadTableData();
};

const onCategoryDropdownChanged = () => {
  console.log(queryParams.value.categoryIds);
  loadTableData();
};

const onStatusDropdownChanged = () => {
  console.log(queryParams.value);
  loadTableData();
};
// Components
import { useRoute } from 'vue-router';
import { anyTypeAnnotation, typeParameter } from '@babel/types';
/** Title */

const route = useRoute();
console.log(route);
const pageName = ref('');

onMounted(() => {
  pageName.value = route.meta.pageName;
});
</script>
