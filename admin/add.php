<style>
div.form-grp {
	display:block;
	margin-bottom:22px;
}
	
	div.form-grp label {
		display:block;
		float:left;
		width:100px;
		margin-top:5px;
	}
	span.description {
		display:block;
		clear:both;

	}
</style>
<div class="wrap">
	<h2>
		<a style="color:#4c4c4c;" href="<?php echo admin_url('admin.php?page=tcmaplists_admin');?>"><i class="icon ion-arrow-left-b"></i></a> Add new
	</h2>
	<hr/>
	<form method="POST">
		<?php wp_nonce_field('add_new_list','add_new_list');?>
		<input type="hidden" name="add_new" value="true"/>
		<input type="hidden" name="latitude" id="google-loc-lat"/>
		<input type="hidden" name="longitude" id="google-loc-long"/>
		<div style="display:block;float:left;width:40%;margin-right:2%;">
			<div class="form-grp">
				<label for="name">Name:</label>
				<input name="name" class="regular-text" id="name" type="text" value size="40" required="true" placeholder="name"/>			
				<span class="description">The name of the customer/user.</span>
			</div>

			<div class="form-grp">
				<label for="name">Email:</label>
				<input name="email" class="regular-text" id="email" type="email" required="true" placeholder="email@sample.com"/>
				<span class="description">The email of the customer/user.</span>
			</div>

			<div class="form-grp">
				<label for="name">Address:</label>
				<input name="location" class="regular-text" id="google-loc" type="text" required="true" placeholder="123 - Street"/>
				<span class="description">The current address of the customer/user.<br/> Following the format Number - Street </span>
			</div>
			
			<div class="form-grp">
				<label for="name">City:</label>
				<input name="city" class="regular-text" id="google-loc-city" type="text" required="true" placeholder="City"/>
				<span class="description">The current city of residence.</span>
			</div>
			
			<div class="form-grp">
				<label for="name">State:</label>
				<input name="state" class="regular-text" id="google-loc-state" type="text" required="true" placeholder="City"/>
				<span class="description">The current state.</span>
			</div>
			
			<div class="form-grp">
				<label for="name">Zipcode:</label>
				<input name="zipcode" class="regular-text" id="google-loc-zipcode" type="text" required="true" placeholder="City"/>
				<span class="description">The current city of residence.</span>
			</div>
			
			<input type="hidden" name="country" id="google-loc-country"/>
		</div>
		<div style="display:block;float:left;width:58%; height:280px;" id="google-map-admin">
			Loading...
		</div>
		<br/>
		<div style="clear:both;">
			
		</div>
		<h3>
			Description
		</h3>
		<?php wp_editor('','desc');?><br/>
		<input type="submit" class="button-primary" style="float:right;"/>
	</form>
</div>