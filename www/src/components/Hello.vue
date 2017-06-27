<template>
  <div id="hello">
    <div class="row justify-content-center">
      <div class="col-8">
        <form class="form-inline my-2 my-lg-0 search">
          <input class="form-control mr-sm-2 col-10" type="text" placeholder="Search">
          <button class="btn btn-success my-2 my-sm-0 searchbtn" type="submit"><i class="fa fa-search fa-1x" aria-hidden="true"></i></button>
        </form>
      </div>
    </div>

    <div class="row">

      <div class="card-columns">
        <div v-for='keep in keeps'>
          <div class="card">
            <img class="card-img-top img-fluid" :src="keep.imgUrl" alt="Card image cap">
            <div class="card-block">
              <h4 class="card-title">{{keep.title}}</h4>
              <p class="card-text">{{keep.body}}</p>
            </div>
            <div class="card-footer">
              <small><span class="details" title="Number of Keeps"><i class="fa fa-plus" aria-hidden="true"></i> {{keep.keepCount}}</span> &nbsp; <span class="details" title="Number of Shares"><i class="fa fa-share" aria-hidden="true"></i> {{keep.shareCount}}</span> &nbsp; <span class="details" title="Number of Views"><i class="fa fa-eye" aria-hidden="true"></i> {{keep.viewCount}}</span></small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {

      }
    },
    computed: {
      keeps() {
        return this.$store.state.keeps
      }
    }
  }

</script>

<style scoped>
  #hello {
    margin: 30px;
  }

  a {
    color: #42b983;
  }

  .card {
    margin-top: 10px;
  }

  .details {
    border: 1px solid #292b2c;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
  }

  .card-footer {
    border-top: 0px;
    background-color: #fff;
    padding-bottom: 25px;
  }

  .card {
    border: 1px solid #292b2c;
  }

.search {
  padding-bottom: 20px;
  padding-top: 0px;
}

input {
  border: 1px solid #292b2c;
}

.searchbtn {
border:0px solid #FF5733; -webkit-border-radius: 3px; -moz-border-radius: 3px;border-radius: 5px;font-size:16px;padding: 10px 20px 10px 20px; text-decoration:none; display:inline-block; color: #000000;
 background-color: #FFC300; background-image: -webkit-gradient(linear, left top, left bottom, from(#FF5733), to(#FFC300));
 background-image: -webkit-linear-gradient(top, #FF5733, #FFC300);
 background-image: -moz-linear-gradient(top, #FF5733, #FFC300);
 background-image: -ms-linear-gradient(top, #FF5733, #FFC300);
 background-image: -o-linear-gradient(top, #FF5733, #FFC300);
 background-image: linear-gradient(to bottom, #FF5733, #FFC300);filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#FF5733, endColorstr=#FFC300);
 margin-right: 20px;
}

.searchbtn:hover{
 border:0px solid #FF5733;
 background-color: #FF5733; background-image: -webkit-gradient(linear, left top, left bottom, from(#FF5733), to(#FF5733));
 background-image: -webkit-linear-gradient(top, #FF5733, #FF5733);
 background-image: -moz-linear-gradient(top, #FF5733, #FF5733);
 background-image: -ms-linear-gradient(top, #FF5733, #FF5733);
 background-image: -o-linear-gradient(top, #FF5733, #FF5733);
 background-image: linear-gradient(to bottom, #FF5733, #FF5733);filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#FF5733, endColorstr=#FF5733);
}
</style>