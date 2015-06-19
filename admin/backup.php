
<div class="wrap">
<?php



if ( ! class_exists( 'WP_List_Table' ) ) {
    require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
}


class List_table_name extends WP_List_Table {
	protected $tablename; 
	protected $columns;
	protected $sortable_columns;
	public function __construct() {
		parent::__construct();
		
		global $wpdb;
		
		//Settings
		$this->tablename = $wpdb->prefix . 'techriver_maplists'; //Name of your database
		
		$this->columns = array( // Columns to be displayed with format key_name => table_name
			'id' => 'ID',
			'name' => 'Name'
		);
		
		$this->sortable_columns = array( // Which columns will be sortable
			'id',
			'name'
		);
	}
	
	function get_columns() {
		return $this->columns;
	}
	
	function get_data() {
		global $wpdb;
		
		$sql = "SELECT * FROM {$this->tablename}";

		$results = $wpdb->get_results($sql,ARRAY_A);

		return $results;
		
	}
	
	function column_default($item, $column_name) {
		switch($column_name){
			case 'special_case':
				return 'special case';
			default:
				return $item[ $column_name ];
		}
	}
	
	function get_sortable_columns() {
		//build the sortable columns
		$sortable = array();
		foreach($this->sortable_columns as $col) {
			echo $col;
			$sortable[] = array($col => array($col,false));
		}
		return $sortable;
	}
	
	function prepare_items() {
		$columns = $this->get_columns();
  		$hidden = array();
  		$sortable = $this->get_sortable_columns();
		var_dump($sortable);
  		$this->_column_headers = array($columns, $hidden, $sortable);

  		$this->items = $this->get_data();
	}
}

$mylisttable = new List_table_name();
$mylisttable->prepare_items();
$mylisttable->display();
?>
</div>

