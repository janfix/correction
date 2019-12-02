<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\IteminfoRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use App\User;
use App\Models\Iteminfo;
use App\Models\Coresult;
/**
 * Class IteminfoCrudController
 * @package App\Http\Controllers\Admin
 * @property-read CrudPanel $crud
 */
class IteminfoCrudController extends CrudController
{
    use \App\Http\Controllers\Operations\ListOperation;
   // use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \App\Http\Controllers\Operations\CreateOperation;
    use \App\Http\Controllers\Operations\ExportOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    //use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;
    //use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \App\Http\Controllers\Operations\ScoreOperation;
    use \App\Http\Controllers\Operations\AttributionOperation; 
    use \App\Http\Controllers\Operations\SuppressOperation;


    public function  index()  {
       //dd($listOfItem);
        $this->crud->hasAccessOrFail('list');
        $this->data['crud'] = $this->crud;
        
        //dd($this->data['crud']);
        //dd($this->crud->query->count());
        
        $this->data['title'] = $this->crud->getTitle() ?? mb_ucfirst($this->crud->entity_name_plural);
        // load the view from /resources/views/vendor/backpack/crud/ if it exists, otherwise load the one in the package

        return view($this->crud->getListView(), $this->data);
    }

    public function setup()
    {
        // 1. Check if is Admin or not. The Admin can see everything !   
        $user = auth()->user();
        //dd($user->isAdministrator());
        // 2. Check attribution, for that, you have to chech the perfoID attributed
            //dd($user->id);
            //dd($this->crud);
        // dd($user->coresults()->pluck('coresult_id'));
        $listPerfo = $user->coresults()->pluck('coresult_id'); 
        //dd($listPerfo);
        //3. Connect this perfoID with the IteminfoID and Create an array onf ItemInfo Specific to this Corrector-user
        $listOfItem = array();
        foreach ($listPerfo as $key => $perfo) {
            $coresult = Coresult::find($perfo);
            $item = $coresult->item_id;
            if (!in_array($item,  $listOfItem))
                {
                    array_push($listOfItem, $item); 
                }
        }
        $this->crud->setModel('App\Models\Iteminfo');
        $this->crud->setRoute(config('backpack.base.route_prefix') . '/iteminfo');
        $this->crud->setEntityNameStrings('iteminfo', trans("correction.Correction list"));  

        
        
        if(!$user->isAdministrator()){//IF NOT ADMIN Because the admin can see everything! 
        if(sizeof($listOfItem) >0){
            for ($i=0; $i < sizeof($listOfItem); $i++) { 
                if($i==0){
                  $this->crud->query->where('id',$listOfItem[$i]);   
                }
                else{
                    $this->crud->query->orWhere('id',$listOfItem[$i]); 
                }
            }
        }}
        //$this->crud->query->where('id',2)->orWhere('id',3)->orWhere('id', 4);
/*        $this->crud->query->where('id',2);
        $this->crud->query->orWhere('id',3);
        $this->crud->query->orWhere('id', 4); */
    }

    protected function setupListOperation()
    {
        // TODO: remove setFromDb() and manually define Columns, maybe Filters
       // $this->crud->setFromDb();
        


        $this->crud->addColumn([
            'label' => trans("correction.Correction name"),
            'type' => 'text',
            'name' => 'corrname',
            'priority' => 1
        ]);
        $this->crud->addColumn([
            'label' => trans("correction.Audio file folder"),
            'type' => 'text',
            'name' => 'mediapath',
            'priority' => 1
        ]);
          $this->crud->addColumn([
            'label' => trans("correction.Item type"),
            'type' => 'text',
            'name' => 'itemtype',
            'priority' => 1
        ]);
         $this->crud->addColumn([
            'label' => trans("correction.Correction type"),
            'type' => 'text',
            'name' => 'corrtype',
            'priority' => 1
        ]);

    }

    protected function setupCreateOperation()
    {
        $this->crud->setValidation(IteminfoRequest::class);

        // TODO: remove setFromDb() and manually define Fields
        $this->crud->setFromDb(); 
    }

    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}
