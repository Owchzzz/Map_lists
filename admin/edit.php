
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
		<a style="color:#4c4c4c;" href="<?php echo $_SERVER['HTTP_REFERER'];?>"><i class="icon ion-arrow-left-b"></i></a> Editing <?php echo $user_data->name;?>
	</h2>
	<hr/>
	<form method="POST" class="editor" action="<?php echo admin_url('admin.php?page='.$_REQUEST['page'])?>&action=submit_modify">
		<?php wp_nonce_field('sp_modify_customer_submit','sp_modify_customer_submit');?>
		<input type="hidden" name="update_user" value="true"/>
		<input type="hidden" name="id" value="<?php echo $user_data->id;?>"/>
		<input type="hidden" name="latitude" id="google-loc-lat" value="<?php echo $user_data->latitude;?>"/>
		<input type="hidden" name="longitude" id="google-loc-long" value="<?php echo $user_data->longitude;?>"/>
		
		<div style="display:block;float:left;width:40%;margin-right:2%;">
			<div class="form-grp">
				<label for="name">Name:</label>
				<input name="name" class="regular-text" id="name" type="text" size="40" required="true" placeholder="name" value="<?php echo $user_data->name;?>"/>			
				<span class="description">The name of the customer/user.</span>
			</div>

			<div class="form-grp">
				<label for="name">Email:</label>
				<input name="email" class="regular-text" id="email" type="email" required="true" placeholder="email@sample.com" value="<?php echo $user_data->email;?>"/>
				<span class="description">The email of the customer/user.</span>
			</div>

			<div class="form-grp">
				<label for="name">Address:</label>
				<input name="location" class="regular-text" id="google-loc" type="text" required="true" placeholder="123 - Street, City, Country" value="<?php echo $user_data->location;?>"/>
				<span class="description">The current address of the customer/user.<br/> Following the format Number Street, city, country </span>
			</div>
			
			<div class="form-grp">
				<label for="name">City:</label>
				<input name="city" class="regular-text" id="google-loc-city" type="text" required="true" placeholder="City" value="<?php echo $user_data->city;?>"/>
				<span class="description">The current city of residence.</span>
			</div>
			
			<div class="form-grp">
				<label for="name">State:</label>
				<input name="state" class="regular-text" id="google-loc-state" type="text" required="true" placeholder="state" value="<?php echo $user_data->state;?>"/>
				<span class="description">The current state.</span>
			</div>
			
			<div class="form-grp">
				<label for="name">Zipcode:</label>
				<input name="zipcode" class="regular-text" id="google-loc-zipcode" type="text" required="true" placeholder="zipcode" value="<?php echo $user_data->zipcode;?>"/>
				<span class="description">The current city of residence.</span>
			</div>
			
			<!--hidden country locked US-->
			<input type="hidden" name="country" id="google-loc-country" value="<?php echo $user_data->country;?>"/>
		</div>
		<div style="display:block;float:left;width:58%; height:280px;" id="google-map-admin" class="edit-user-map">
			Loading...
		</div>
		<br/>
		<div style="clear:both;">
			
		</div>
		<label style="display:block;float:left;">Description: </label>
		<select name="desc" style="display:block;float:left;margin-left:5%;width:40%;">
						<option><?php echo $user_data->desc;?></option>
						<option>PSC Patient</option>
						<option>PSC Supporter</option>
						<option>PSC Clinician</option>
						<option>PSC Research</option>
					</select>
	</form>
</div>