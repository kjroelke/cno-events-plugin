<?php
/**
 * The Admin Handler
 *
 * @package ChoctawNation
 */

/** Load the Post Type Builder */
require_once __DIR__ . '/class-post-type-builder.php';

/** Handles the WP Hooks & Filters logic */
class Admin_Handler extends Post_Type_Builder {
	/** Handles the WordPress Admin Columns Hooks & Filters */
	protected function init() {
		$this->add_acf_date_columns();
		$this->make_acf_columns_sortable();
		$this->add_cpt_to_search_loop();
	}

	/** Adds ACF Start & End Date Columns */
	private function add_acf_date_columns() {
		add_filter( 'manage_edit-choctaw-events_columns', array( $this, 'add_acf_to_columns_array' ) );
		add_action( 'manage_choctaw-events_posts_custom_column', array( $this, 'echo_acf_value_to_column' ), 10, 2 );
	}

	/**
	 * Adds ACF Start & End Date to Admin Columns
	 *
	 * @param array $columns the Admin Columns
	 */
	public function add_acf_to_columns_array( array $columns ) {
		$columns['start_date'] = 'Start Date';
		$columns['end_date']   = 'End Date';
		return $columns;
	}

	/**
	 * Displays ACF Start & End Date on Admin Edit screen
	 *
	 * @param string $column the column
	 * @param int    $post_id the post id
	 */
	public function echo_acf_value_to_column( string $column, int $post_id ) {
		$field = get_field( 'event_details', $post_id );
		switch ( $column ) {
			case 'start_date':
				echo $field['time_and_date']['start_date'] ?? '';
				break;
			case 'end_date':
				echo $field['time_and_date']['end_date'] ?? '';
				break;
		}
	}

	/** Makes the ACF columns sortable */
	private function make_acf_columns_sortable() {
		add_filter( 'manage_edit-choctaw-events_sortable_columns', array( $this, 'declare_sortable_acf_field_column' ) );
		add_action( 'pre_get_posts', array( $this, 'add_acf_to_column_query' ) );
	}

	/**
	 * Make the ACF Field column sortable
	 *
	 * @param array $columns the columns
	 */
	public function declare_sortable_acf_field_column( array $columns ) {
		$columns['start_date'] = 'start_date';
		$columns['end_date']   = 'end_date';
		return $columns;
	}

	/**
	 * Sort the posts based on the ACF Field column
	 *
	 * @param WP_Query $query the query
	 */
	public function add_acf_to_column_query( $query ) {
		if ( ! is_admin() || ! $query->is_main_query() ) {
			return;
		}

		$orderby = $query->get( 'orderby' );

		if ( 'start_date' === $orderby ) {
			$query->set( 'meta_key', 'event_details_time_and_date_start_date' ); // Replace 'acf_field' with the custom field name
			$query->set( 'orderby', 'meta_value' );
		}

		if ( 'end_date' === $orderby ) {
			$query->set( 'meta_key', 'event_details_time_and_date_end_date' ); // Replace 'acf_field' with the custom field name
			$query->set( 'orderby', 'meta_value' );
		}
	}

	/** Add Custom Post Type to WP Search */
	private function add_cpt_to_search_loop() {
		add_action( 'pre_get_posts', array( $this, 'include_choctaw_events_post_type_in_search' ) );
	}

	/** Callback Function: Adds Custom Post Type to WP Query
	 *
	 * @param WP_Query $query the curent query
	 */
	public function include_choctaw_events_post_type_in_search( WP_Query $query ) {
		if ( $query->is_search && ! is_admin() ) {
			$query->set( 'post_type', array( 'choctaw-events' ) );
		}
	}
}
