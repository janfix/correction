<?php


namespace App\Http\Controllers\Operations;

use Illuminate\Support\Facades\Route;

trait SuppressOperation
{
    /**
     * Define which routes are needed for this operation.
     *
     * @param string $segment    Name of the current entity (singular). Used as first URL segment.
     * @param string $routeName  Prefix of the route name.
     * @param string $controller Name of the current CrudController.
     */
    protected function setupSupressRoutes($segment, $routeName, $controller)
    {
        Route::post($segment.'/suppress/{id}', [
            'as'        => $routeName.'.destroy',
            'uses'      => $controller.'@destroy',
            'operation' => 'suppress',
        ]);
    }

    /**
     * Add the default settings, buttons, etc that this operation needs.
     */
    protected function setupSuppressDefaults()
    {
        
        $this->crud->allowAccess('delete');

       /*  $this->crud->operation('delete', function () {
            $this->crud->loadDefaultOperationSettingsFromConfig();
        }); */

        $this->crud->operation(['list', 'show'], function () {
            $this->crud->addButton('line', 'suppress', 'view', 'crud::buttons.suppress', 'end');
        });
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return string
     */
    public function destroy($id)
    {
        $this->crud->hasAccessOrFail('delete');

        // get entry ID from Request (makes sure its the last ID for nested resources)
        $id = $this->crud->getCurrentEntryId() ?? $id;

        return $this->crud->delete($id);
    }
}
