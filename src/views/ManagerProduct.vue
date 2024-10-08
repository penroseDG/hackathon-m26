<template>
    <div class="container-main">
      <h1>Quản Lý Sản Phẩm</h1>
      <button class="add-btn" @click="toggleForm">Thêm Sản Phẩm Mới</button>
  
      <!-- Form Thêm Sản Phẩm -->
      <div class="overlay" v-if="isFormVisible">
        <div class="form-container">
          <h2>Thêm Sản Phẩm Mới</h2>
          <label for="name">Tên:</label>
          <input type="text" v-model="newProduct.name" id="name" placeholder="Nhập tên sản phẩm" />
  
          <label for="image">URL Ảnh:</label>
          <input type="text" v-model="newProduct.image" id="image" placeholder="Nhập đường dẫn ảnh" />
  
          <label for="price">Giá:</label>
          <input type="number" v-model="newProduct.price" id="price" placeholder="Nhập giá" />
  
          <label for="quantity">Số Lượng:</label>
          <input type="number" v-model="newProduct.quantity" id="quantity" placeholder="Nhập số lượng" />
  
          <div class="form-buttons">
            <button class="add-product-btn" @click="addProduct">Thêm Sản Phẩm</button>
            <button class="close-btn" @click="closeForm">Đóng</button>
          </div>
        </div>
      </div>
  
      <!-- Form Xác Nhận Xóa Sản Phẩm -->
      <div class="overlay" v-if="isDeleteConfirmVisible">
        <div class="form-container">
          <h2>Xác Nhận Xóa</h2>
          <p>Bạn có chắc chắn muốn xóa sản phẩm "{{ productToDelete.name }}" không?</p>
          <div class="form-buttons">
            <button class="add-product-btn" @click="confirmDelete">Xóa</button>
            <button class="close-btn" @click="closeDeleteConfirm">Hủy</button>
          </div>
        </div>
      </div>
  
      <!-- Form Chỉnh Sửa Sản Phẩm -->
      <div class="overlay" v-if="isEditFormVisible">
        <div class="form-container">
          <h2>Chỉnh Sửa Sản Phẩm</h2>
          <label for="edit-name">Tên:</label>
          <input type="text" v-model="currentProduct.name" id="edit-name" placeholder="Nhập tên sản phẩm" />
  
          <label for="edit-image">URL Ảnh:</label>
          <input type="text" v-model="currentProduct.image" id="edit-image" placeholder="Nhập đường dẫn ảnh" />
  
          <label for="edit-price">Giá:</label>
          <input type="number" v-model="currentProduct.price" id="edit-price" placeholder="Nhập giá" />
  
          <label for="edit-quantity">Số Lượng:</label>
          <input type="number" v-model="currentProduct.quantity" id="edit-quantity" placeholder="Nhập số lượng" />
  
          <div class="form-buttons">
            <button class="add-product-btn" @click="updateProduct">Cập Nhật Sản Phẩm</button>
            <button class="close-btn" @click="closeEditForm">Đóng</button>
          </div>
        </div>
      </div>
  
      <input class="search-bar" placeholder="Tìm kiếm theo tên" />
  
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Số Lượng</th>
            <th>Tùy Chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index">
            <td>{{ index + 1 }}</td>
            <td><img :src="product.image" alt="" width="50" /></td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }} đ</td>
            <td>{{ product.quantity }}</td>
            <td>
              <button class="edit-btn" @click="openEditForm(product)">Chỉnh Sửa</button>
              <button class="delete-btn" @click="openDeleteConfirm(product)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  
  <script setup>
  import { ref } from 'vue';
  
  const isFormVisible = ref(false);
  const isEditFormVisible = ref(false);
  const isDeleteConfirmVisible = ref(false);
  const newProduct = ref({ name: '', image: '', price: 0, quantity: 0 });
  const currentProduct = ref({});
  const productToDelete = ref({}); // Thêm biến cho sản phẩm cần xóa
  const products = ref([
    { image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSEhMSFRIVFxgVFxUXFRUVFRUVFRUXFxUWFRUYHSggGBonGxYVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lICYtLS0vLS0vLS0tLS0tLS0tLS0tLy0tLS8tLS0rLTAtLi0vNS0tLS0tLSstLy0xLS0tLf/AABEIAMMBAgMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAwQBAgUGB//EADYQAAIBAgMGAwYGAwADAAAAAAABAgMRITFBBAUSUWFxBoGREyKhscHwFBUyUtHhQnLxYoKi/8QAGgEBAAIDAQAAAAAAAAAAAAAAAAEDAgQFBv/EAC0RAAICAgEDAgQFBQAAAAAAAAABAhEDBDESEyFBgQUUofAiQlFhwRUyM1KR/9oADAMBAAIRAxEAPwD7iAAAAAAAAAAAAAAAAYAMgAAAENfaYQV5yiu7+hDaXJKTfBMDj1fEVJZcUvgivLxJooerf8GvLcwx5kXx1cr/ACnoAecfiKX7Y/E3j4iesV5Mr/qGD/Yy+SzfoegBxYeII6xfqXKO9aUv8rdy2G1hnxJFctfLHmJeBrGSeKaa6GxsFIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKO8t60qCvOSvpFYt+R5/xJ4vjC9Og05ZOei7c2eC2jbZTblNtt6vF3Ofs70cfiPlm/raMsnmfhHq95+MKk8Ie5H/69f4OJLeEnfHvc4/tcjf2nPC+vc4eXZyZHbZ28Wtjxqkjpx2p9MVzN47U+t/4OXCvfD79SeFR62t87o05yZsKKOpHafTn1LEamX1OWp2Vr5K7XUs3/T1v9/MptkuKL8auPRfHsTKefyKUW7pLPmtb/wDPiWIVLpyve7yxzLItlMol/Z9qlF+7JrsdnYd+PKauua07nn4xfblji12XmSxSvZXa00v99zewbObE/wAL9jSy4Mc+Ue2pVVJXi7o3PJ7HtUqburrG1udj0exbYqi5S1R6DW3I5vD8M5GfXlj88osgA3DWAAAAAAAAAAAAAAAAAAAAAAAADPBeLfFTlejQfu5Smv8ALmo9Opf8cb84F+Hpv3pL32tIv/Hu/kfP3hne3Tkczc2qfbj7nT0tVNdyfsROXo87kU43eGLu8FfC3UstWs3k+0nirXtfM19irvG2HJtp559vmcxwbOqpUVlLC2Oa0vgaSk3lprrp8DevH3E001K+SxXC7Wu1rftkQOd7t2TVl8GsLdviVShRYpFqnU7YFuE1bhtjg1nZfaObCpq7LTvZZv1LNGrdp529TXcKLFIvU6uD4k8Vg8/jqW1Uso8uXVZt+pzaDUk0rvVO+ODyLamrRWTTuuzzTX3kUygjKzpU0r2xzu9c8vgyen+qV3hG/dL6nLhU/VNYXeFsVfS/TAv0Noi37ztKSxk+9rrnk0QlRjI6EJrCfKP6Y3yd0m2vkXowbUW78kr8s0vlqU9mnwQvjqnKOLXE1n1yLVSK4Yp3bdm7LLHF373v3N7EvHn9DSycmYJNNpNK/e3Ru2BPSrOLulZ6WeCMSb4krxsvdlZ2adsNOxvKSbaWLvZ4WtLPyui5Rryn5Ndu+T0Gw7Wqi6rNfUsnl9nrOElJW8smlg/vqelpVFJKSyZ29TY7safKOZsYeh2uDcGGZNs1wAAAAAAAAAAAAAAAAAAQ7ZtCpwlN5RTfoTHmfHO28NKNJZzd3/rH+7ehXmyduDkWYodc1E8Ft1ZznKcsXJtvzIm0k0nj+218M27+UTaor6mKVrr3bLBu+sUryb5LJnnLuR6NJJEtOCWM07YXebk27W6R+kSC2EuBuXD7rjor5+mBZpVGla12rPOOCdne788epBW4WozTtBSbf/leWEX6Y/8AC+1RXXkpVZ2nV4X7vClw44LPix5Wy6s5/FbNr37O/wC1Y+euPkXdsqcSWNm5y4m1hbNWt1v6rkUa9VOU52wd7LRXeGXJFMmi2KNU3hjgyehVtk7O2fUqKd2lkrYW6fy/mbRfXHLyKpIzTOhCTVmsssC7QrS4rXTSya5dDkUpSwatf6os7HXcZJuOHLR3KJRLLOvCaaVnZ3t5adniW0pJtXhKMVeP/tbiir5fWxyqaSUYte7J3UuVuvmWdlbd1e0lddJWK34JO7s0nw8Edf1K+KwunHnhodOjWkn7qV4RVnL9Elo1yd0jgUJJvjd41LrJ4Zacjo7Ntdo+znjGVkslF2vnyeJbiyKPr9+n1KMuO1x9+p1tms1xK13bixTeGaeqs1gby2pXdlgo/q0urWT/AJOfUqpp2hhZqbwcoNNYp63RPSqXvw24MMrYrk3pbkzaWb8q++ft/wDOTUlj9WSVHGNldcWq6PG6+B1Ny7Vi4aaX5nC/FOXFayVrNf6vCxNsta0rrBp363uRh2VjyqUeP4MMuFyg0z2LMGtGpxRT5o2Z6dO1ZxGqMgAkAAAAAAAAAAAAAAAA+eeMto49oktIpR9MX8Wz6Gz5VvOpxVJy5yb+Jz/iMqgkb/w+NzbObNGYNtZX96N9Pds4tPkndIVEQuVr2WL797+hxYypnaasn2ivKKblwp/os1fLBY9l95FHbuFJReLdsF7sVngrY5vPXE2qybslLi6ytn1v5kFeXDeXEm72wvdc3d5Z/Mzc7IUaNK1TG7f+P6UrJP8ApFCTtG1sH7z5t5ehYna1tG736EUlfDDBfAr6jOqIWrNWzth2saxd+7+BvL43NOG1+v0JsG7drWZYhK+umpTTy+7G8fqQ0SmdKhWk7L4PsXaTcmuFNTTaa/d/fzOVCpbhb0w74lqhJxksbp/PkyiUSxM7lHaIuKlZ3iveWjWWKzR1KLg7ODTd1hLHissOzxauuhw6FSHtJJp8MuTvmsWn3xLWyvhUVmsbSt8LlLl0kuNnYjWSfGoyUng0/wBLtpw56czKlFq0UlfJpt3v06YYFajXtLF3i8Vdp2a0afJkznxaKz0StawlPxz9Clwpm3Er/uwzT4b3eb15/Am2afXL7ZUorV5q9yXZeb5FcW7sicVR7PctS9O3L6/bOgcPcFTFrRr5HcPZaU+vDF+x5zYj05GAAbRQAAAAAAAAAAAAAAAYnkz5VtscX3fzZ9WPmm+Nn4KslpxP5nO+IxuKZ0Ph7qTRxZleT+XzLdXPL7tiVpo4Ujtor1csrW5YevMqVI5dvVoty+/4K9SH3kY2ZohbzvyslovgR8N196E0748zSoumDJsghqR1RiayeTJHHD+DOFsDKyKK9sdOplxwzt5kyhrgvQxwacPxJsUa0s0tC5RxvfDHPsQKlJLC1yzRjdW01K5syRdVP301qlrqs8NC7DG6Tbxwtg9bc9TnUJPiwvg8LnVpyxbw4s3pflexqzLUTbNU4k7vztqX6b18n2KtGKbwWeOL+pe2WGa+dmYRVleRqjSs7XWr+v8AwxSqaczm722h8fCs4tJPoy3sSwvqWzj0tIxirhZ6zw6/e8meiPPeGoYvovmz0J6n4aq10ed3f8rAAN81AAAAAAAAAAAAAAAAeK8WULVG+ePqv6PanB8VbPeCkv8AV/NfX1Nfah1Y2bGrPpyI+e7QsynOVi5tqxef94FGbxZ5vIqZ6KHlGlSJDON/QmkRvmVMsRE1h2NHDl6MlcTXh1yIBGqbv05GvB/wmdNehhq9v4MrBFwpLFf0ba2v3wJVB9/vQzwWvciwQxop45rO/UmjG8fo3qbQp46/QlVJPk/WxDZkkb0Fgi5Ti9bdLciKFNXtyJ6dk8rPDz1w5lMkZJl/ZpZL19Tp7NBrW65nLpY4rC+eR0aM9fT77mMHRVl4NN4bLFzUktU274vTC+nTqYjBL7VyWtO6fSxjZoXduqMpSc5FcfwxPUeHKVot9kdkqbso8NNLV4vzLZ7DVx9vDGP7HnM8+rI2AAbBSAAAAAAAAAAAAAAACLaqCnBweTX/ABkoIavwE6PlW/dklTm4y0w/vtY4M35n1Dxjun2tPjirzhjb9y/k+XVc7Hnt3D25nodPN3IfuYTMNmqmYuaDN5G1zJpckRiyaMcPxMuLJEjKiiLIo0VP/hv7PnkbQi/MkhT72IbJI4JZ3uSwj5G8aeGXl1JKdO2WBj1EmOF3w5ZaE1NY42wV+oirfLr5kiin5+tjF+QiSnJXTWuBdjLDTNFSgtdNCzGOFvtERjZEyWGOPP6u50d1bHxVEtM2/PH5fEo0KTw+f33sew3LsfBHif6pfBHS0NXuTV+5z9zP24OjpJAA9QefAAAAAABhyKEttRBU28A6jqI0dZHFnt5FLb+pFk0d17QjV7SjgPbzR7cLJ6T0P4pD8Yjzb2xmr2l8yOonpPSvbUavb0eb/EPmY9syOonoPRvb0eC8W7mUXKtSXuvGUUv0vmunyO37VmHO+DyKM8I5Y0zYwTlilaPmsnYxxHod+bia9+krx1jqu3NHmZKxwcuCUHTO7iyxmrRN7Q3Uispm8ZmvKJsJl2DJo5FKEyxCZSzKizBYk1NFeEixTehX1UHEkjElSXkYiyWKIsijCj6fehKlh/KMxj98yelD7/kzirZDdGnBkrY5lilTu+fTPM3pbM3z754npN17nylPBft59ze1tWeSXhGpsbMca8ke5N2XfHJe5oudvoeiMJWwRk9JgwxxR6UeezZpZZWwAC4qAAAAAAPBy3j1IJ7ecd1jX2xhZZR1ntbYVdnNjVN1VIsmjoqsbKqUI1DdVCLMi8qhlVCl7Qz7QiyS77QyqhS9oZ9oYmSLvtDKqFL2hn2pBmi6pnL3nuenVxXuz5rJ90T+1MSrlc4qSplsJOLtHj9v3XUp/qi7fuWK/rzOfxW1PbbRtHI87vLZlK7SV+mBzsuuvQ6WLYv+450axLT2k5u0UpxyKc9pmtDWes2bSyI9NT2ktU9qR438fPkbR3jU5FT0mzNZonuae0rmWYbSjwUNvq6FzZ3Xm835FfyUl6mXcie6p7QtWdjdWz+1a4fU8vuHwzVqNOfF53Z9R3LuyNGNtToamhbuXBztzbjBVHkm3fu6FNZXlzf0LoB3oQjBVFHn5TcnbAAMjEAAAAAAAAA+TVNmaIJUme/rbmT0OdtG4+hg0Zpnj7M3izvVdzPkV5bqZjRnZzVI3Ui492yC3fIUTZV4jKkWfwEuQ/BS5EUTZX4jKkT/AIKXIz+ClyIomyvxGHMs/gpcjV7DLkYsyTK0qpFKoXPy2fIzHdMuRg02WKSRzXIjlC53Ibjky1S8Psx7bZn3UjyVTY0ytPc6f+J9EoeHFqdGhuCC0Hy7Y+aSPk68MN5RLez+CZy0PrtLdcFoizDZorQn5NepD35Lg+a7B4B/ceo3b4UpU/8AFHplBGxbHWhH0KJ7mSXqQbPssYrBInAL0qNZtvkAAkgAAAAAAAAAAAAxY1dNG4AIJbKnoRvYY8i2ACi93R5Gv5dHkdAEUTZzfy6PIflseR0gKFnN/LY8jK3bHkdEChbOf+Wx5D8ujyOgBSFs5/5ejaOwovAUhbK0dlRIqKJQTQs1UTYAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//Z', name: 'Orange', price: 30000, quantity: 100 },
    { image: 'data:image/jpeg;base64,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', name: 'Apple', price: 20000, quantity: 50 },
    { image: 'data:image/jpeg;base64,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', name: 'Banana', price: 25000, quantity: 200 },
    { image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QBoRXhpZgAASUkqAAgAAAACAA4BAgArAAAAJgAAAJiCAgAPAAAAUQAAAAAAAABSaXBlIGdyYXBlcyB3aXRoIGxlYWYgb24gYSB3aGl0ZSBiYWNrZ3JvdW5kQW50b24gSWduYXRlbmNv/+0AjFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAABwHAJQAApkaW9uaXN2ZXJvHAJ4ACtSaXBlIGdyYXBlcyB3aXRoIGxlYWYgb24gYSB3aGl0ZSBiYWNrZ3JvdW5kHAJ0AA9BbnRvbiBJZ25hdGVuY28cAm4AGEdldHR5IEltYWdlcy9pU3RvY2twaG90b//hBUpodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iPgoJPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KCQk8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIgICB4bWxuczpHZXR0eUltYWdlc0dJRlQ9Imh0dHA6Ly94bXAuZ2V0dHlpbWFnZXMuY29tL2dpZnQvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwbHVzPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3htcC8xLjAvIiAgeG1sbnM6aXB0Y0V4dD0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcEV4dC8yMDA4LTAyLTI5LyIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgZGM6UmlnaHRzPSJBbnRvbiBJZ25h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', name: 'Grape', price: 60000, quantity: 80 },
    { image: 'data:image/webp;base64,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', name: 'Watermelon', price: 30000, quantity: 30 },
  ]); 
  
  const toggleForm = () => {
    isFormVisible.value = !isFormVisible.value;
  };
  
  const openEditForm = (product) => {
    currentProduct.value = { ...product };
    isEditFormVisible.value = true;
  };
  
  const closeEditForm = () => {
    isEditFormVisible.value = false;
  };
  
  const openDeleteConfirm = (product) => {
    productToDelete.value = product;
    isDeleteConfirmVisible.value = true;
  };
  
  const closeDeleteConfirm = () => {
    isDeleteConfirmVisible.value = false;
  };
  
  const addProduct = () => {
    if (newProduct.value.name && newProduct.value.price >= 10000 && newProduct.value.quantity >= 1 && newProduct.value.quantity <= 100) {
      products.value.push({ ...newProduct.value }); // Thêm sản phẩm
      resetForm();
      toggleForm();
    } else {
      alert('Vui lòng nhập đầy đủ thông tin chính xác');
    }
  };
  
  const updateProduct = () => {
    const index = products.value.findIndex(product => product.name === currentProduct.value.name);
    if (index !== -1) {
      products.value[index] = { ...currentProduct.value };
      closeEditForm();
    } else {
      alert('Sản phẩm không tìm thấy');
    }
  };
  
  const confirmDelete = () => {
    const index = products.value.findIndex(product => product.name === productToDelete.value.name);
    if (index !== -1) {
      products.value.splice(index, 1);
      closeDeleteConfirm();
    } else {
      alert('Sản phẩm không tìm thấy');
    }
  };
  
  const closeForm = () => {
    toggleForm();
  };
  
  const resetForm = () => {
    newProduct.value = { name: '', image: '', price: 0, quantity: 0 };
  };
  </script>
 <style scoped>
 h1 {
   margin-bottom: 20px;
   text-align: center; /* Căn giữa tiêu đề */
 }
 
 .add-btn {
   background-color: #007bff;
   color: white;
   border: none;
   padding: 10px 15px;
   border-radius: 5px;
   cursor: pointer;
   margin-bottom: 20px;
   display: block; /* Đặt nó trên một dòng mới */
   width: 200px; /* Chiều rộng của nút */
   margin-left: auto; /* Căn giữa */
   margin-right: auto; /* Căn giữa */
 }
 
 .add-btn:hover {
   background-color: #0056b3;
 }
 
 .overlay {
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background: rgba(0, 0, 0, 0.7);
   display: flex;
   justify-content: center;
   align-items: center;
 }
 
 .form-container {
   background: white;
   padding: 20px;
   border-radius: 5px;
   width: 400px;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
 }
 
 .form-container label {
   display: block;
   margin-top: 10px;
 }
 
 .form-container input {
   width: 100%;
   padding: 10px;
   margin-top: 5px;
   margin-bottom: 10px;
   border: 1px solid #ccc;
   border-radius: 5px;
 }
 
 .form-buttons {
   display: flex;
   justify-content: space-between;
 }
 
 .add-product-btn,
 .close-btn {
   padding: 10px 15px;
   border: none;
   border-radius: 5px;
   cursor: pointer;
 }
 
 .add-product-btn {
   background-color: #28a745;
   color: white;
 }
 
 .add-product-btn:hover {
   background-color: #218838;
 }
 
 .close-btn {
   background-color: #dc3545;
   color: white;
 }
 
 .close-btn:hover {
   background-color: #c82333;
 }
 
 .search-bar {
   float: right;
   padding: 10px;
   margin-bottom: 20px;
   border-radius: 5px;
   border: 1px solid #ccc;
 }
 
 table {
   width: 100%;
   border-collapse: collapse;
   margin-top: 20px; /* Cách biệt với nút thêm sản phẩm */
 }
 
 table th,
 table td {
   border: 2px solid #ddd; /* Giảm độ dày viền */
   padding: 12px;
   text-align: center;
 }
 
 table th {
   background-color: #f8f9fa;
 }
 
 img {
   border-radius: 5px;
 }
 
 .edit-btn,
 .delete-btn {
   padding: 5px 10px;
   border: none;
   border-radius: 5px;
   cursor: pointer;
 }
 
 .edit-btn {
   background-color: #28a745;
   color: white;
 }
 
 .edit-btn:hover {
   background-color: #218838;
 }
 
 .delete-btn {
   background-color: #dc3545;
   color: white;
 }
 
 .delete-btn:hover {
   background-color: #c82333;
 }
 
 html, body {
   margin: 0;
   padding: 0;
   height: 100%;
 }
 
 .container-main {
   padding: 20px; /* Thêm padding cho toàn bộ */
 }
 
 table {
   margin-top: 20px;
   overflow-x: auto;
 }
 </style>
 