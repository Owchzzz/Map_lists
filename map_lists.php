<?php
/**
Plugin Name: Map Lists
Plugin URI: 
Description: A plugin created by TechRiver specifically for savejon.org
Author: Richard Abear
Version: 0.0.1
Author URI: http://ma.tt/
*/

define( 'MAP_PLUGIN_PATH', plugin_dir_path( __FILE__ ) ); 
if ( !defined( 'ABSPATH' ) ) exit;

class Techriver_Map_lists {
	
	protected $version="0.0.1";
	
	protected $loader;
	
	public function __construct() {
		add_action('admin_menu',array($this,'load_views'));
		add_action('wp_enqueue_scripts',array($this,'enqueExt'));
		add_action('wp_print_styles',array($this,'enqueStyles'));
		add_shortcode('tc_maplists',array($this,'handle_tcmap_sc'));
		$this->load_dependencies();
	}	
	
	
	private function load_dependencies() {
		require_once(MAP_PLUGIN_PATH.'map_lists_install.php');
		$this->loader = new Techriver_Map_lists_install($this->version);
	}
	
	public function setupPlugin() {
		$this->loader->install();
	}
	
	public function enqueExt() {
		wp_enqueue_script('simpleModalJS',plugins_url('assets/js/simpleModalJS.js',__FILE__),array('jquery'),'1.0.0',true);
		
		//Google Maps
		wp_register_script('tc_googlemaps','http://maps.googleapis.com/maps/api/js?libraries=places',false,'3');
		wp_enqueue_script('tc_googlemaps');
		
		//local js
		wp_register_script('techriver_maplistsJS',plugins_url('assets/js/plugin.js',__FILE__,array('jquery'),'1.0.0',true));
		$resource_array = array(
		'bubble_marker' => plugins_url('assets/images/bubble-marker.png',__FILE__));
		wp_localize_script('techriver_maplistsJS','tc_resource_obj_ml',$resource_array);
		wp_enqueue_script('techriver_maplistsJS');
		
		
		
		
		
	}
	
	public function enqueStyles() {
		wp_enqueue_style('techriver_maplistsCSS',plugins_url('assets/css/style.css',__FILE__));
	}
	
	public function updatePlugin() {
		$this->loader->update();
	}
	
	
	public function load_views() {
		add_menu_page('TC Map Lists','TC Map Lists','manage_options','tcmaplists_admin',array($this,'load_admin_view'),'dashicons-admin-site');
	}
	
	
	public function load_admin_view() {
		require_once(MAP_PLUGIN_PATH.'/admin/main.php');
	}
	
	
	public function handle_tcmap_sc() {
		$wpnonce_form = wp_nonce_field('add_location');
		$output = '<!--MODALS-->
	<div id="simplemodal-modal">
		<i class="simplemodal-close icon ion-close-round"></i>
		<div class="content">
			<h2>
				Add a new location
			</h2>
			<hr/>
			<p>
				<form method="post">
				'.$wpnonce_form.'
				<input type="hidden" name="tc_form_submit_maplists" value="1"/>
					<div class="formgroup">
						<label>Name:</label>	<input type="text" name="name" placeholder="Enter your name"/>
					</div><br/><br/>
					<div class="formgroup">
						<label>Email:</label>	<input type="email" name="email" placeholder="Enter your email"/>
					</div><br/><br/>
					<div class="formgroup">
						<label>Current Address:</label>	<input type="text" id="google-loc" name="loc" class="loc" placeholder="Address (ex. 148 Elm St.)"/>
					</div>
					<div class="formgroup">
						<textarea name="desc" placeholder= "place a unique description of yourself"></textarea>
					</div><br/><br/>
				</form>
			</p>
		<div style="clear:both;"></div>
		</div>
	</div>
	<!--End of Modals-->
	
<div id="googleMapContainer">
	<div id="user-controls">
		<ul class="user-controls-list">
			<li><a href="#" class="new-content-btn"><i class="icon ion-compose"></i></a></li>
		</ul>
	</div>
	<div id="googleMap" style="width:100%;height:620px;">
	
	</div>
</div>';
		return $output;
	}
	
	
	public function handle_form_submit_one() {
		if(isset($_POST['tc_form_submit_maplists']) && '1' == $_POST['tc_form_submit_maplists']) {
			global $wpdb;
			$parse_data = array(
			'name' => mysql_real_escape_string($_POST['name']),
			'email' => mysql_real_escape_string($_POST['email']),
			'location' => mysql_real_escape_string($_POST['location']),
			'langitude' => mysql_real_escape_string($_POST['langitude']),
			'longitude' => mysql_real_escape_string($_POST['longitude']),
			'established' => 'NOW()');
			
			
		}
	}
}

if( class_exists('Techriver_Map_lists')) {
	$map_lists = new Techriver_Map_lists();
	register_activation_hook(__FILE__,array(&$map_lists,'setupPlugin'));
}