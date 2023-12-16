
# Ecommerce_Rest_API


## API Reference

#### Register User

```http
  POST /api/auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. |
| `password` | `string` | **Required**. |
| `userType` | `buyer or seller` | **Required**. |

if User already exists then this response will be genrated
![Screenshot 2023-12-16 162436](https://github.com/FlowerC9/E-commerce_Rest_API/assets/99163825/1750ad80-9314-4f4b-86d1-2b3a31695526)
else
![Screenshot 2023-12-16 162556](https://github.com/FlowerC9/E-commerce_Rest_API/assets/99163825/09d44aad-c2a3-4e39-bb6e-4059880cdefe)
response will be registered users json data
#### Login

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required** |
| `password`      | `string` | **Required** |
| `userType`      | `buyer or seller` | **Required** |

is login credentials are right then this response will be genrated
![Screenshot 2023-12-16 162703](https://github.com/FlowerC9/E-commerce_Rest_API/assets/99163825/906d2b36-5020-403e-90cf-54c3775af739)
else 
![Screenshot 2023-12-16 162812](https://github.com/FlowerC9/E-commerce_Rest_API/assets/99163825/ceafabce-1718-4829-83e6-168474627437)
this response will be genrated ie.invalid credentials

```http
GET /api/buyer/list-of-sellers
```
this request Requires jwt token of logged in user in headers ie logged in buyer to verify the user using middleware
the successful response is this
![Screenshot 2023-12-16 163202](https://github.com/FlowerC9/E-commerce_Rest_API/assets/99163825/3b8c2d26-1a82-457c-b0aa-17e168251e35)


```http
GET /api/buyer/seller-catalog/:seller_id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `seller_id`      | `string` | **Required** |

![Screenshot 2023-12-16 163243](https://github.com/FlowerC9/E-commerce_Rest_API/assets/99163825/4796dd3f-165e-4f4a-a046-96424b2949b6)
this request will give response of catalog of the seller corrosponding to that seller_id.this request also takes jwt token in headers.

```http
POST /api/buyer/create-order/:seller_id
```

this request will create order corrosponding to seller id and takes jwt token in headers and response is order list.
![Screenshot 2023-12-16 163338](https://github.com/FlowerC9/E-commerce_Rest_API/assets/99163825/87496d23-c09a-446b-9971-bc77d1571922)

```http
POST /api/seller/create-catalog
```

this request takes productName,price and category object and add these products to catalog. and response is newly added product.
![Screenshot 2023-12-16 163419](https://github.com/FlowerC9/E-commerce_Rest_API/assets/99163825/00006860-9c45-4c9c-b26a-3ac1f82e6d88)

```http
POST /api/seller/orders
```

this request show all orders placed by all the buyers.
it takes jwt token of logged in seller and response is list of orders.
![Screenshot 2023-12-16 163503](https://github.com/FlowerC9/E-commerce_Rest_API/assets/99163825/7d065edb-8384-4de0-bb51-c8c849b42453)
