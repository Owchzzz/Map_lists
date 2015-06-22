<?php

if ( !defined( 'ABSPATH' ) ) exit;

class Techriver_Map_lists_install {
	protected $version;
	protected $table_name;
	
	public function __construct($version) {
		global $wpdb;
		
		$this->version = $version;
		$this->table_name = $wpdb->prefix . 'techriver_maplists';
	}
	
	public function install() {
		$this-> create_table($this->table_name);
		
		add_option('techriver_maplists_version',$this->version);
	}
	
	public function update() {
		$installed_ver = get_option('techriver_maplists_version');
		if($installed_ver !== $this->version) {
			$this->create_table($this->table_name);
			
			update_option('techriver_maplists_version',$this->version);
		}
	}
	
	
	private function create_table($tablename) {
		global $wpdb;
		$charset_collate = $wpdb->get_charset_collate();
		
		$sql = "CREATE TABLE {$tablename} (
			id mediumint(9) NOT NULL AUTO_INCREMENT,
			established datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
			name text NOT NULL,
			location text NOT NULL,
			latitude DOUBLE NOT NULL,
			longitude DOUBLE NOT NULL,
			email text NOT NULL,
			desc text NOT NULL,
			UNIQUE KEY id (id)
		) $charset_collate;";
		
		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		dbDelta( $sql );
	}
}