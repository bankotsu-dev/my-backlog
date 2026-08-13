<?php

namespace App\Http\Controllers;

use App\Models\BookSerie;
use App\Models\BookGenre;
use Illuminate\Http\Request;
use App\Http\Requests\StoreBookSerieRequest;
use App\Http\Requests\UpdateBookSerieRequest;

class BookSerieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->perPage ?? 10;
        $series = BookSerie::where('user_id', auth()->user()->id)
        ->search($request->search)
        ->status($request->status)
        ->with('genres')
        ->orderBy('title', 'asc')
        ->paginate($perPage)
        ->withQueryString();

        return inertia('books/index', [
            'series' => $series,
            'bookGenres' => BookGenre::all(),
            'filters' => [
                'search' => $request->search,
                'perPage' => $perPage,    
                'status' => $request->status,    
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookSerieRequest $request)
    {
        try {
            $serie = BookSerie::create($request->validated());
            $serie->genres()->sync($request->genres);
            return back();
        } catch (\Throwable $th) {
            return back()->withErrors(['error' => $e->getMessage(),]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(BookSerie $bookSerie)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BookSerie $bookSerie)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookSerieRequest $request, BookSerie $bookSerie)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BookSerie $bookSerie)
    {
        //
    }
}
