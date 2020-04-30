<?php
  class Book_model extends CI_Model {
       
      public function __construct(){
          
        $this->load->database();
        
      }

      //API call - get a book record by isbn
      public function getbookbyid($id){  
        $this->db->select('id, title, author');
        $this->db->from('books');
        $this->db->where('id',$id);
        $query = $this->db->get();
        
        if($query->num_rows() == 1)
        {
            return $query->result_array();
        }
        else
        {
          return 0;
       }
   }

    //API call - get all books record
    public function getallbooks(){   

        $this->db->select('id, title, author');

        $this->db->from('books');

        $this->db->order_by("id", "desc"); 

        $query = $this->db->get();

        if($query->num_rows() > 0){

          return $query->result_array();

        }else{

          return 0;

        }

    }
   
   //API call - delete a book record
    public function delete($id){

       $this->db->where('id', $id);

       if($this->db->delete('books')){

          return true;

        }else{

          return false;

        }

   }
   
   //API call - add new book record
    public function add($data){

        if($this->db->insert('books', $data)){

           return true;

        }else{

           return false;

        }

    }
    
    //API call - update a book record
    public function update($id, $data){

       $this->db->where('id', $id);

       if($this->db->update('books', $data)){

          return true;

        }else{

          return false;

        }

    }

}