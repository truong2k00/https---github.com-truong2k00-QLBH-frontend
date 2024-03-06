
interface ISanPhamQueryParams extends IBasePaginationQueryParams {
    searchText: string;
    categoryIds: Number[];
    status?: Boolean;
}