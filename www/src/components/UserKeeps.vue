<template>
	<div class="userkeeps">
		<h2 class="create">Create a Keep</h2>
		<div class="row justify-content-center">
			<div class="col-10">
				<form class="vault-form" @submit.prevent="createKeep">
					<div class="form-group">
						<input type="text" class="form-control" v-model="title" aria-describedby="name" placeholder="Name" required>
					</div>
					<div class="form-group">
						<input type="text" class="form-control" v-model="body" placeholder="Description (optional)">
					</div>
					<div class="form-group">
						<input type="text" class="form-control" v-model="imgUrl" placeholder="Image URL" required>
					</div>
					<div class="form-group">
						<input type="text" class="form-control" v-model="linkUrl" placeholder="Link URL" required>
					</div>
					<div class="form-group">
						<input type="text" class="form-control" v-model="tags" placeholder="Tags (separate by comma)">
					</div>
					<div class="form-check">
						<label class="form-check-label">
                            <input type="checkbox" class="form-check-input" v-model="public" checked> Make Public? <span class="small">Keeps marked public can not be deleted</span>
                        </label>
					</div>
					<button type="submit" class="btn btn-primary createbtn">Create a Keep</button>
				</form>
			</div>
		</div>
		<hr>
		<div class="row">
			<div class="col-12">
				<h3 class="create">Your Keeps:</h3>
			</div>
		</div>
		<div class="row">
			<div class="card-columns">
				<div v-for='keep in keeps'>
					<div class="card">
						<a :href="keep.linkUrl" target="_blank"><img class="card-img-top img-fluid" :src="keep.imgUrl" alt="Card image cap"></a>
						<div class="card-block">
							<a :href="keep.linkUrl" target="_blank">
								<h4 class="card-title">{{keep.title}}</h4>
							</a>
							<p class="card-text">{{keep.body}}</p>
						</div>
						<div class="card-footer">
							<button type="button" class="interaction" data-toggle="modal" data-target="#addtovault" @click="setActiveKeep(keep)"><i class="fa fa-plus" aria-hidden="true"></i> Add to a Vault</button>							&nbsp; <button v-if="keep.public == false" class="delete" @click="deleteKeep(keep)"><i class="fa fa-trash" aria-hidden="true"></i> Delete</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Add Keep to Vault Modal -->
		<div class="modal fade" id="addtovault" role="dialog">
			<div class="modal-dialog modal-lg">

				<!-- Add Keep to Vault Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Add this keep to a vault</h4>
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
		name: 'userkeeps',
		data() {
			return {
				title: '',
				body: '',
				imgUrl: '',
				linkUrl: '',
				public: true,
				tags: ['']
			}
		},
		mounted() {
			this.$store.dispatch('getUserKeeps', this.user)
			this.$store.dispatch('getvaults', this.$route.params.id)
		},
		computed: {
			keeps() {
				return this.$store.state.myKeeps
			},
			vaults() {
				return this.$store.state.vaults
			},
			activeKeep() {
				return this.$store.state.activeKeep
			}
		},
		methods: {
			createKeep() {
				let tagsArr = []
				if (this.tags.includes(",")) {
					tagsArr = this.tags.split(', ')
				} else {
					tagsArr = this.tags.split(" ")
				}
				this.tags = tagsArr
				this.$store.dispatch('createKeep', { title: this.title, body: this.body, imgUrl: this.imgUrl, linkUrl: this.linkUrl, public: this.public, tags: this.tags })
			},
			deleteKeep(keep) {
				var keepIndex = this.keeps.indexOf(keep)
				this.keeps.splice(keepIndex, 1)
				this.$store.dispatch('deleteKeep', keep)
			},
			setActiveKeep(keep) {
				this.$store.dispatch('activeKeep', keep)
			},
			addVaultToKeep(vault) {
				this.$store.dispatch('addVaultToKeep', { vaults: vault, keep: this.activeKeep })
				$('#addtovault').modal('hide');
			}
		},
		components: {}
	}

</script>


<style scoped>
	a:hover {
		text-decoration: none;
	}

	.form-check {
		text-align: left;
		padding: 5px;
	}

	.small {
		font-size: 12px;
	}

	.card-footer {
		border-top: 0px;
		background-color: #fff;
		padding-bottom: 15px;
	}

	.delete {
		border: 1px solid #292b2c;
		padding: 10px 15px 10px 15px;
		margin: 5px;
		border-radius: 5px;
		background-color: #fff;
		color: #292b2c;
	}

	.delete:hover {
		background-color: #ff4d4d;
	}

	.createbtn {
		width: 75%;
		padding: 10px;
		text-align: center;
		font-size: 20px;
		    background-color: #FF4FE7;
    border: 0px;
	}

	  .interaction:hover {
    background-color: #84FF30;
  }
</style>