<?php

namespace App\Http\Controllers\Operations;

use Illuminate\Support\Facades\Route;

trait AttributionOperation
{
    /**
     * Define which routes are needed for this operation.
     *
     * @param string $segment    Name of the current entity (singular). Used as first URL segment.
     * @param string $routeName  Prefix of the route name.
     * @param string $controller Name of the current CrudController.
     */
    protected function setupAttributionRoutes($segment, $routeName, $controller)
    {
        Route::get($segment.'/attribution/{id}', [
            'as'        => $routeName.'.attribution',
            'uses'      => $controller.'@attribution',
            'operation' => 'attribution',
        ]);
    }

    /**
     * Add the default settings, buttons, etc that this operation needs.
     */
    protected function setupAttributionDefaults()
    {
        $this->crud->allowAccess('attribution');
        $this->crud->setOperationSetting('setFromDb', true);

        $this->crud->operation('attribution', function () {
            $this->crud->loadDefaultOperationSettingsFromConfig();
        });

        $this->crud->operation('list', function () {
            $this->crud->addButton('line', 'attribution', 'view', 'crud::buttons.attribution', 'beginning');
        });
        
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return Response
     */
    public function attribution($id)
    {
        $this->crud->hasAccessOrFail('attribution');

        // get entry ID from Request (makes sure its the last ID for nested resources)
        $id = $this->crud->getCurrentEntryId() ?? $id;
        $setFromDb = $this->crud->get('attribution.setFromDb');

        // get the info for that entry
        $this->data['entry'] = $this->crud->getEntry($id);
        $this->data['crud'] = $this->crud;
        $this->data['title'] = $this->crud->getTitle() ?? trans('backpack::crud.preview').' '.$this->crud->entity_name;

        // set columns from db
        if ($setFromDb) {
            $this->crud->setFromDb();
        }

        // cycle through columns
        foreach ($this->crud->columns() as $key => $column) {
            // remove any autoset relationship columns
            if (array_key_exists('model', $column) && array_key_exists('autoset', $column) && $column['autoset']) {
                $this->crud->removeColumn($column['name']);
            }

            // remove any autoset table columns
            if ($column['type'] == 'table' && array_key_exists('autoset', $column) && $column['autoset']) {
                $this->crud->removeColumn($column['name']);
            }

            // remove the row_number column, since it doesn't make sense in this context
            if ($column['type'] == 'row_number') {
                $this->crud->removeColumn($column['name']);
            }

            // remove columns that have visibleInAttribution set as false
            if (isset($column['visibleInAttribution']) && $column['visibleInAttribution'] == false) {
                $this->crud->removeColumn($column['name']);
            }

            // remove the character limit on columns that take it into account
            if (in_array($column['type'], ['text', 'email', 'model_function', 'model_function_attribute', 'phone', 'row_number', 'select'])) {
                $this->crud->modifyColumn($column['name'], ['limit' => 999]);
            }
        }

        // remove preview button from stack:line
        $this->crud->removeButton('attribution');

        // remove bulk actions colums
        $this->crud->removeColumns(['blank_first_column', 'bulk_actions']);

        // load the view from /resources/views/vendor/backpack/crud/ if it exists, otherwise load the one in the package
        return view($this->crud->getAttributionView(), $this->data);
    }
}
