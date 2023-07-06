<template>
  <footer class="footer pa-6 mt-10">
    <div class="d-flex justify-center my-3">
      <h3>Contact Us</h3>
    </div>
    <ul class="footer-list">
 
      <li>
        <v-btn
           fab
          href="https://www.linkedin.com/in/abdul-hai-mohamed-158205219"
        >
          <v-icon class="linkedin-icon"  >mdi-linkedin</v-icon>
        </v-btn>
      </li>
      <li>
        <v-btn  fab href="mailto:ABDULHAI.MOHAMED.SAMY@gmail.com">
          <v-icon class="email-icon"  >mdi-email</v-icon>
        </v-btn>
      </li>
      <li>
        <v-btn  fab href="tel:+201120979873">
          <v-icon class="phone-icon"  >mdi mdi-phone-classic</v-icon>
        </v-btn>
      </li>
    </ul>
  </footer>
</template>

<style scoped lang="scss">
footer {
  background-color: #009688;
  color: white;
}

.footer-list {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
}

.footer-list li {
  margin: 0 10px;
  & a, & a:hover{
    list-style: none;
    text-decoration: none;

  }
}

.footer-list i {
  font-size: 30px !important; /* Customize the font size */
}
.linkedin-icon {
  color: #0077b5 !important;  
}

.email-icon {
  color: #dd39a6!important; 
}

.phone-icon {
  color: green!important;  
}
</style>
