
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
		<a style="color:#4c4c4c;" href="<?php echo admin_url('admin.php?page=tcmaplists_admin');?>"><i class="icon ion-arrow-left-b"></i></a> Editing <?php echo $user_data->name;?>
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
		</div>
		<div style="display:block;float:left;width:58%; height:280px;" id="google-map-admin" class="edit-user-map">
			Loading...
		</div>
		<br/>
		<div style="clear:both;">
			
		</div>
		<h3>
			Description
		</h3>
		<?php wp_editor($user_data->desc,'desc');?><br/>
		<input type="submit" class="button-primary" style="float:right;"/>
	</form>
</div>