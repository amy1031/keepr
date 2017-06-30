<template>
  <div id="hello">
    <div class="row justify-content-center">
      <div class="col-10 ">
        <form class="form-inline mb-2 my-lg-0 search" @submit.prevent="searchKeeps">
        <button class="btn btn-success mb-2 mb-sm-0 col-2 searchbtn" type="button" @click="keepsToggle">View All</i></button>
          <input class="form-control mr-sm-2 mb-sm-0 col-8" type="text" v-model="search" placeholder="Search tags">
          <button class="btn btn-success mb-2 mb-sm-0 col-1 searchbtn" type="submit" @click="searchedKeepsToggle"><i class="fa fa-search fa-1x" aria-hidden="true"></i></button>
        </form>
      </div>
    </div>

    <!-- All Public Keeps Shown -->
    <div class="row" v-if="this.showKeeps">
      <div class="card-columns">
        <div v-for='keep in keeps'>
          <div class="card">
            <a :href="keep.linkUrl" target="_blank" class="titlelink" @click="increaseViewCount(keep)"><img class="card-img-top img-fluid" :src="keep.imgUrl" alt="Card image cap"></a>
            <div class="card-block">
              <a :href="keep.linkUrl" target="_blank" @click="increaseViewCount(keep)">
                <h4 class="card-title">{{keep.title}}</h4>
              </a>
              <p class="card-text">{{keep.body}}</p>
            </div>
            <div class="card-footer">
              <small><span title="Add this keep to a Vault"><button type="button" class="interactionlink" data-toggle="modal" data-target="#addtovault" @click="setActiveKeep(keep)"><i class="fa fa-plus" aria-hidden="true"></i> {{keep.keepCount}}</button></span> &nbsp; <span title="Number of Views this Keep has" class="interaction"><i class="fa fa-eye" aria-hidden="true"></i> {{keep.viewCount}}</button></span></small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search Results Shown -->
    <div class="row" v-if="this.showSearchResults">
      <div class="card-columns">
        <div v-for='keeps in keepsSearch'>
          <div class="card">
            <a :href="keeps.linkUrl" target="_blank" class="titlelink" @click="increaseViewCount(keep)"><img class="card-img-top img-fluid" :src="keeps.imgUrl" alt="Card image cap"></a>
            <div class="card-block">
              <a :href="keeps.linkUrl" target="_blank" @click="increaseViewCount(keep)">
                <h4 class="card-title">{{keeps.title}}</h4>
              </a>
              <p class="card-text">{{keeps.body}}</p>
            </div>
            <div class="card-footer">
              <small><span title="Add this keep to a Vault"><button type="button" class="interaction" data-toggle="modal" data-target="#addtovault" @click="setActiveKeep(keeps)"><i class="fa fa-plus" aria-hidden="true"></i> {{keeps.keepCount}}</button></span> &nbsp; <span title="Number of Views this Keep has" class="interaction"><i class="fa fa-eye" aria-hidden="true"></i> {{keeps.viewCount}}</span></small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--<span title="Share this Keep"><button class="interaction" @click="increaseShares"><i class="fa fa-share" aria-hidden="true"></i> {{keeps.shareCount}}</button></span> &nbsp;-->

    <!-- Add Keep to Vault Modal --> 
    <div class="modal fade" id="addtovault" role="dialog">
      <div class="modal-dialog modal-lg">

        <!-- Add Keep to Vault Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" v-if="user">Add this keep to a vault</h4>
            <h4 v-else>You must be signed in to add a keep to a vault</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <ul id="double">
              <li v-for='vault in vaults'>
                <span class="vaultoption">{{vault.title}} <button class="addbtn" @click="addVaultToKeep(vault._id)"> + </button></span>
              </li>
            </ul>
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
        search: '',
        showKeeps: true,
        showSearchResults: false
      }
    },
    mounted() {
      this.$store.dispatch('getAllKeeps')
      this.$store.dispatch('getvaults', this.user)
    },
    computed: {
      keeps() {
        return this.$store.state.keeps
      },
      vaults() {
        return this.$store.state.vaults
      },
      user() {
        return this.$store.state.user
      },
      activeKeep() {
        return this.$store.state.activeKeep
      },
      keepsSearch() {
        return this.$store.state.searchResults
      }
    },
    methods: {
      setActiveKeep(keep) {
        this.$store.dispatch('activeKeep', keep)
      },
      addVaultToKeep(vault) {
        this.$store.dispatch('addVaultToKeep', { vaults: vault, keep: this.activeKeep })
        $('#addtovault').modal('hide');
        this.activeKeep.keepCount++
      },
      increaseViewCount(keep) {
        this.$store.dispatch('activeKeep', keep)
        this.$store.dispatch('increaseViewCount', keep)
        this.activeKeep.viewCount++
      },
      increaseShares() {
      },
      searchKeeps() {
        this.$store.dispatch('searchKeeps', this.search)
      },
      keepsToggle() {
        this.showKeeps = true;
        this.showSearchResults = false;
      },
      searchedKeepsToggle() {
        this.showSearchResults = true;
        this.showKeeps = false;
      }
    }
  }

</script>

<style>
  #hello {
    margin: 30px;
  }

  a {
    color: #42b983;
  }

  a:hover {
    text-decoration: none;
  }

  a:active {
    text-decoration: none;
  }

  .titlelink {
    color: #292b2c;
  }

  .card-title {
    color: #42b983;
  }

  .card {
    margin-top: 10px;
  }

  .card-footer {
    border-top: 0px;
    background-color: #fff;
    padding-bottom: 15px;
  }

  .card {
    border: 1px solid #292b2c;
  }

  .search {
    padding-bottom: 20px;
    padding-top: 0px;
  }

  .vaultoption {
    font-size: 26px;
  }

  input {
    border: 1px solid #292b2c;
  }

  .interaction {
    border: 1px solid #292b2c;
    padding: 10px 30px 10px 30px;
    margin: 5px;
    border-radius: 5px;
    background-color: #fff;
    color: #292b2c;
  }

    .interactionlink {
    border: 1px solid #292b2c;
    padding: 10px 30px 10px 30px;
    margin: 5px;
    border-radius: 5px;
    background-color: #fff;
    color: #292b2c;
  }

  .interactionlink:hover {
    background-color: #84FF30;
  }

  .add {
    border: 1px solid #292b2c;
    padding: 10px 15px 10px 15px;
    margin: 5px;
    border-radius: 5px;
    background-color: #fff;
    color: #000;
  }

  ul {
    margin-bottom: 5px;
    overflow: hidden;
  }

  li {
    line-height: 1.5em;
    float: left;
    display: inline;
    padding: 5px;
  }

  #double li {
    width: 50%;
  }

  .searchbtn {
    border: 0px solid #FF5733;
    border-radius: 5px;
    font-size: 16px;
    padding: 10px 20px 10px 20px;
    text-decoration: none;
    display: inline-block;
    color: #fff;
    background-color: #FF5733;
    margin-right: 20px;
  }

  .searchbtn:hover {
    border: 0px solid #FF5733;
    background-color: #FFC300;
  }

  .addbtn {
    border: 0px solid #FF5733;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 5px;
    font-size: 16px;
    padding: 5px 10px 5px 10px;
    text-decoration: none;
    display: inline-block;
    color: #000000;
    background-color: #FFC300;
    background-image: -webkit-gradient(linear, left top, left bottom, from(#FF5733), to(#FFC300));
    background-image: -webkit-linear-gradient(top, #FF5733, #FFC300);
    background-image: -moz-linear-gradient(top, #FF5733, #FFC300);
    background-image: -ms-linear-gradient(top, #FF5733, #FFC300);
    background-image: -o-linear-gradient(top, #FF5733, #FFC300);
    background-image: linear-gradient(to bottom, #FF5733, #FFC300);
    filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#FF5733, endColorstr=#FFC300);
    margin-right: 20px;
  }

  .addbtn:hover {
    border: 0px solid #FF5733;
    background-color: #FF5733;
    background-image: -webkit-gradient(linear, left top, left bottom, from(#FF5733), to(#FF5733));
    background-image: -webkit-linear-gradient(top, #FF5733, #FF5733);
    background-image: -moz-linear-gradient(top, #FF5733, #FF5733);
    background-image: -ms-linear-gradient(top, #FF5733, #FF5733);
    background-image: -o-linear-gradient(top, #FF5733, #FF5733);
    background-image: linear-gradient(to bottom, #FF5733, #FF5733);
    filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#FF5733, endColorstr=#FF5733);
  }
</style>