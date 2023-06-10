<template>
 <div>
  <h1>Test for Z2A</h1>
   <hr>
   <ul>
     <li v-for="(data, i) in savedString" :key="i">
       {{data}}
     </li>
   </ul>

   <button @click="decrementPage">Left</button>
   <button @click="incrementPage">Right</button>

   <hr>
   <div>
    <label>Current page: {{this.pageNum}}</label>
   </div>
 </div>

</template>

<script>

import axios from "axios";
const CryptoJS = require("crypto-js");

export default {
  name: 'App',

  data() {
    return {
      jwtToken: '',
      savedString: [],
      pageNum: 1,
      baseUrl: 'http://localhost:8082/v1'
    }
  },

  created() {
    this.jwtToken = this.generateJWT();
    this.getData(this.pageNum, this.jwtToken)
        .then(response => {
          this.savedString = response;
        })
        .catch(error => {
          console.error('Error fetch data:', error);
        });
  },

  methods: {
    generateJWT() {
      const header = { "alg": "HS256", "typ": "JWT" };
      const payload = { "user": "John Doe" };
      const secretKey = "mcb3DaS05Yvt";

      const encodedHeader = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(header)));
      const encodedPayload = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(payload)));

      const token = `${encodedHeader}.${encodedPayload}`;
      const signature = CryptoJS.HmacSHA256(token, secretKey).toString(CryptoJS.enc.Base64);

      return `${token}.${signature}`;
    },

    decrementPage() {
      if (this.pageNum > 1) {
        this.pageNum--;

        this.getData(this.pageNum, this.jwtToken)
            .then(response => {
              this.savedString = response;
            })
            .catch(error => {
              console.error('Error fetch data:', error);
            });
      }
    },

    incrementPage() {
      this.getData(this.pageNum+1, this.jwtToken)
          .then(response => {
            if(response.length) {
              this.savedString = response;
              this.pageNum++;
            }
          })
          .catch(error => {
            console.error('Error fetch data:', error);
          });
    },

    getData(pageNum, token) {
      return axios.get(`${this.baseUrl}/redis?page=${pageNum}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {

        return response.data.data;
      }).catch((error) => {
        console.error(error);
      });
    }
  },
}

</script>

<style>

</style>
