<?php

require(APPPATH.'/libraries/REST_Controller.php');
 
class Api extends REST_Controller{
    
    public function __construct()
    {
        parent::__construct();

        $this->load->model('book_model');
    }

    //API - client sends isbn and on valid isbn book information is sent back
    function bookById_get(){
        $id  = $this->get('id');
        
        if(!$id){
            $this->response("No ID specified", 400);
            exit;
        }
        $result = $this->book_model->getbookbyid( $id );
        if($result){
            $this->response($result, 200); 
            exit;
        } 
        else{
             $this->response("Invalid ID", 404);
            exit;
        }
    } 

    //API -  Fetch All books
    function books_get(){

        $result = $this->book_model->getallbooks();

        if($result){

            $this->response($result, 200); 

        } 

        else{

            $this->response("No records found", 404);

        }
    }
     
    //API - create a new book item in database.
    function addBook_post(){

         $title     = $this->post('title');

         $author    = $this->post('author');
        
         if(!$title || !$author){

                $this->response("Enter complete book information to create", 400);

         }else{

            $result = $this->book_model->add(array("title"=>$title, "author"=>$author));

            if($result === 0){

                $this->response("Book not be inserted. Try again.", 404);

            }else{

                $this->response("success", 200);  
           
            }

        }

    }

    
    //API - update a book 
    function updateBook_put(){
         
         $title     = $this->put('title');

         $author    = $this->put('author');
     
         $id        = $this->put('id');
         
         if(!$title || !$author || !$id){

                $this->response("Enter complete book information to save", 400);

         }else{
            $result = $this->book_model->update($id, array("title"=>$title, "author"=>$author));

            if($result === 0){

                $this->response("Book information coild not be saved. Try again.", 404);

            }else{

                $this->response("success", 200);  

            }

        }

    }

    //API - delete a book 
    function deleteBook_delete()
    {

        $id  = $this->delete('id');

        if(!$id){

            $this->response("Parameter missing ".json_encode($id), 404);

        }
         
        if($this->book_model->delete($id))
        {

            $this->response("Success", 200);

        } 
        else
        {

            $this->response("Failed", 400);

        }

    }


}