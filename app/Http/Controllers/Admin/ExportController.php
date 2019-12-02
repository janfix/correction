<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Exports\CorrectionExport;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\Controller;

class ExportController extends Controller
{
    public function export(){
       

        
         return Excel::download(new CorrectionExport, 'correction.xlsx');
    }
}
