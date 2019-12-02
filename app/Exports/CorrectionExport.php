<?php

namespace App\Exports;

use App\Models\Iteminfo;
use App\Models\Coresult;
use Maatwebsite\Excel\Concerns\FromCollection;

class CorrectionExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $perfid = request('perfid');
        $iteminfos = Iteminfo::where('id', $perfid)->get();
        $corrections = Coresult:: where('item_id', $perfid)->where('state','todo')->get();
        return $corrections ;
    }
}
