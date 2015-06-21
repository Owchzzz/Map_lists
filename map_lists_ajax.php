<?php


class Map_lists_ajax {
	protected $table_name;
	
	public function __construct() {
		global $wpdb;
		add_action('wp_ajax_submit_map_data',array($this,'submit_map_data'));
		add_action('wp_ajax_nopriv_submit_map_data',array($this,'submit_map_data'));
		$this->table_name = $wpdb->prefix . 'techriver_maplists';
	}
	
				 
	public function submit_map_data() {
		global $wpdb;
		$data = $_POST['postData'];
		
		if(wp_verify_nonce($data[0]['value'],'add_location')) {
			$insertdata = array();
			for($i = 3; $i < count($data); $i ++) {
				$insertdata[$data[$i]['name']] = $data[$i]['value'];
			}
			$insertdata['established'] = current_time('mysql',1); // Add in current datetime stamp
			if($wpdb->insert($this->table_name,$insertdata)) {
				require_once('views/modals/success-mapsubmit.php');
			}
			else {
				require_once('views/modals/fail-mapsubmit.php');
			}
			
		}
		else {
			echo 'nonce not valid';
		}
		
		exit();
	}
	
}
				 
$maplist_ajax = new Map_lists_ajax();