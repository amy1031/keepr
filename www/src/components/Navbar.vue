<template>
	<div class="navbar">
		<nav class="navbar fixed-top navbar-toggleable-sm navbar-inverse bg-inverse">
			<nav class="navbar">
				<h1 class="navbar-brand mb-0"><router-link :to="'/'">Keepr</router-link></h1>
			</nav>
			<span class="navbar-text">Share and discover new interests.</span>
			<div class="ml-auto">
				<button class="btn btn-primary my-2 my-sm-0 register" type="button" data-toggle="modal" data-target="#register" v-if='user == null'>Register</button>
				<button class="btn btn-primary my-2 my-sm-0 login" type="button" data-toggle="modal" data-target="#login" v-if='user == null'>Login</button>
				<span class="navbar-text" v-if="user">Welcome, {{user.name}} &nbsp; <router-link :to="'/dashboard'"><button class="btn btn-outline-info" type="button">Dashboard</button></router-link> <button class="btn btn-outline-warning" @click="logout()">Logout</button></span>
			</div>
		</nav>
		<!-- Register Modal -->
		<div class="modal fade" id="register" role="dialog">
			<div class="modal-dialog">

				<!-- Register Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Register</h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body">
						<form @submit.prevent="register">
							<div class="form-group">
								<input type="text" class="form-control" v-model="name" placeholder="Name" required>
							</div>
							<div class="form-group">
								<input type="email" class="form-control" v-model="email" placeholder="Email" required>
							</div>
							<div class="form-group">
								<input type="password" class="form-control" v-model="password" placeholder="Password" required>
							</div>
							<button class="btn btn-primary register" type="submit">Register</button>
						</form>
					</div>
				</div>

			</div>
		</div>
		<!-- Login Modal -->
		<div class="modal fade" id="login" role="dialog">
			<div class="modal-dialog">

				<!-- Register Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Log In</h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body">
						<form @submit.prevent="login">
							<div class="form-group">
								<input type="email" class="form-control" v-model="email" placeholder="Email" required>
							</div>
							<div class="form-group">
								<input type="password" class="form-control" v-model="password" placeholder="Password" required>
							</div>
							<button class="btn btn-primary" type="submit">Login</button>
						</form>
					</div>
				</div>

			</div>
		</div>

	</div>
</template>


<script>
	export default {
		name: 'navbar',
		data() {
			return {
				name: "",
				email: "",
				password: ""
			}
		},
		mounted() {
			this.$store.dispatch('getAuth')
		},
		computed: {
			user() {
				return this.$store.state.user
			}
		},
		methods: {
			login() {
				this.$store.dispatch('login', { email: this.email, password: this.password })
				$('#login').modal('hide');
			},
			register() {
				this.$store.dispatch('register', { name: this.name, email: this.email, password: this.password })
				$('#register').modal('hide');
			},
			logout() {
				this.$store.dispatch('logout', this.user)
			}
		},
		components: {}
	}

</script>


<style scoped>
	h1.navbar-brand {
		font-family: Grand Hotel;
		font-size: 30px;
		padding: 0px;
	}


	.register {
		border: 0px solid #64f700;
		-webkit-border-radius: 3px;
		-moz-border-radius: 3px;
		border-radius: 5px;
		font-size: 16px;
		padding: 10px 30px 10px 30px;
		text-decoration: none;
		display: inline-block;
		color: #000000;
		background-color: #84FF30;
		background-image: -webkit-gradient(linear, left top, left bottom, from(#84FF30), to(#D7FF0D));
		background-image: -webkit-linear-gradient(top, #84FF30, #D7FF0D);
		background-image: -moz-linear-gradient(top, #84FF30, #D7FF0D);
		background-image: -ms-linear-gradient(top, #84FF30, #D7FF0D);
		background-image: -o-linear-gradient(top, #84FF30, #D7FF0D);
		background-image: linear-gradient(to bottom, #84FF30, #D7FF0D);
		filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#84FF30, endColorstr=#D7FF0D);
		margin-right: 20px;
	}

	.register:hover {
		border: 0px solid #52c900;
		background-color: #84FF30;
		background-image: -webkit-gradient(linear, left top, left bottom, from(#84FF30), to(#84FF30));
		background-image: -webkit-linear-gradient(top, #84FF30, #84FF30);
		background-image: -moz-linear-gradient(top, #84FF30, #84FF30);
		background-image: -ms-linear-gradient(top, #84FF30, #84FF30);
		background-image: -o-linear-gradient(top, #84FF30, #84FF30);
		background-image: linear-gradient(to bottom, #84FF30, #84FF30);
		filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#84FF30, endColorstr=#84FF30);
	}

	.login, .logout {
		border: 0px solid #B973FF;
		-webkit-border-radius: 3px;
		-moz-border-radius: 3px;
		border-radius: 5px;
		font-size: 16px;
		padding: 10px 30px 10px 30px;
		text-decoration: none;
		display: inline-block;
		color: #000000;
		background-color: #FF4FE7;
		background-image: -webkit-gradient(linear, left top, left bottom, from(#FF4FE7), to(#B973FF));
		background-image: -webkit-linear-gradient(top, #FF4FE7, #B973FF);
		background-image: -moz-linear-gradient(top, #FF4FE7, #B973FF);
		background-image: -ms-linear-gradient(top, #FF4FE7, #B973FF);
		background-image: -o-linear-gradient(top, #FF4FE7, #B973FF);
		background-image: linear-gradient(to bottom, #FF4FE7, #B973FF);
		filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#FF4FE7, endColorstr=#B973FF);
		margin-right: 20px;
	}

	.login:hover, .logout:hover {
		border: 0px solid #F9C4FF;
		background-color: #FF4FE7;
		background-image: -webkit-gradient(linear, left top, left bottom, from(#FF4FE7), to(#FF4FE7));
		background-image: -webkit-linear-gradient(top, #FF4FE7, #FF4FE7);
		background-image: -moz-linear-gradient(top, #FF4FE7, #FF4FE7);
		background-image: -ms-linear-gradient(top, #FF4FE7, #FF4FE7);
		background-image: -o-linear-gradient(top, #FF4FE7, #FF4FE7);
		background-image: linear-gradient(to bottom, #FF4FE7, #FF4FE7);
		filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr=#FF4FE7, endColorstr=#FF4FE7);
	}

a, a:hover {
	color: #fff;
	text-decoration: none;
}
</style>