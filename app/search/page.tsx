"use client";

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  Search, 
  Filter, 
  X, 
  SlidersHorizontal,
  Star,
  TrendingUp
} from 'lucide-react';
import PerfumeCard from '@/components/perfume-card';
import { mockPerfumes, allFragranceNotes, moodCategories, occasionCategories } from '@/data/mockData';
import { Perfume } from '@/types';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '');
  const [filteredPerfumes, setFilteredPerfumes] = useState<Perfume[]>(mockPerfumes);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedConcentrations, setSelectedConcentrations] = useState<string[]>([]);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('relevance');

  const brands = Array.from(new Set(mockPerfumes.map(p => p.brand)));
  const concentrations = Array.from(new Set(mockPerfumes.map(p => p.concentration)));

  const applyFilters = useCallback(() => {
    let filtered = mockPerfumes;

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(perfume =>
        perfume.name.toLowerCase().includes(query) ||
        perfume.brand.toLowerCase().includes(query) ||
        perfume.description.toLowerCase().includes(query) ||
        [...perfume.notes.top, ...perfume.notes.middle, ...perfume.notes.base]
          .some(note => note.toLowerCase().includes(query)) ||
        perfume.mood.some(mood => mood.toLowerCase().includes(query)) ||
        perfume.occasions.some(occasion => occasion.toLowerCase().includes(query))
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(perfume => selectedBrands.includes(perfume.brand));
    }

    // Concentration filter
    if (selectedConcentrations.length > 0) {
      filtered = filtered.filter(perfume => selectedConcentrations.includes(perfume.concentration));
    }

    // Notes filter
    if (selectedNotes.length > 0) {
      filtered = filtered.filter(perfume =>
        selectedNotes.some(note =>
          [...perfume.notes.top, ...perfume.notes.middle, ...perfume.notes.base].includes(note)
        )
      );
    }

    // Mood filter
    if (selectedMoods.length > 0) {
      filtered = filtered.filter(perfume =>
        selectedMoods.some(mood => perfume.mood.includes(mood))
      );
    }

    // Occasion filter
    if (selectedOccasions.length > 0) {
      filtered = filtered.filter(perfume =>
        selectedOccasions.some(occasion => perfume.occasions.includes(occasion))
      );
    }

    // Price filter
    filtered = filtered.filter(perfume =>
      perfume.price >= priceRange[0] && perfume.price <= priceRange[1]
    );

    // Rating filter
    if (ratingFilter > 0) {
      filtered = filtered.filter(perfume => perfume.rating >= ratingFilter);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Relevance - keep original order or implement scoring
        break;
    }

    setFilteredPerfumes(filtered);
  }, [
    searchQuery,
    selectedBrands,
    selectedConcentrations,
    selectedNotes,
    selectedMoods,
    selectedOccasions,
    priceRange,
    ratingFilter,
    sortBy
  ]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedConcentrations([]);
    setSelectedNotes([]);
    setSelectedMoods([]);
    setSelectedOccasions([]);
    setPriceRange([0, 300]);
    setRatingFilter(0);
    setSortBy('relevance');
  };

  const activeFiltersCount = 
    selectedBrands.length + 
    selectedConcentrations.length + 
    selectedNotes.length + 
    selectedMoods.length + 
    selectedOccasions.length + 
    (priceRange[0] > 0 || priceRange[1] < 300 ? 1 : 0) + 
    (ratingFilter > 0 ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Search Fragrances</h1>
          
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search by name, notes, mood, or describe what you're looking for..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={searchQuery === 'fresh citrus' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSearchQuery('fresh citrus')}
            >
              Fresh & Citrus
            </Button>
            <Button
              variant={searchQuery === 'vanilla sandalwood' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSearchQuery('vanilla sandalwood')}
            >
              Warm & Woody
            </Button>
            <Button
              variant={searchQuery === 'floral romantic' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSearchQuery('floral romantic')}
            >
              Floral & Romantic
            </Button>
            <Button
              variant={searchQuery === 'spicy masculine' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSearchQuery('spicy masculine')}
            >
              Spicy & Bold
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="sticky top-24">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  Filters
                </CardTitle>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                    Clear All
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Price Range</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    max={300}
                    min={0}
                    step={10}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Minimum Rating</Label>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={ratingFilter === rating}
                          onCheckedChange={(checked) => {
                            setRatingFilter(checked ? rating : 0);
                          }}
                        />
                        <label
                          htmlFor={`rating-${rating}`}
                          className="flex items-center gap-1 text-sm cursor-pointer"
                        >
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          & up
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Brand</Label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedBrands([...selectedBrands, brand]);
                            } else {
                              setSelectedBrands(selectedBrands.filter(b => b !== brand));
                            }
                          }}
                        />
                        <label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Concentration Filter */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Concentration</Label>
                  <div className="space-y-2">
                    {concentrations.map((concentration) => (
                      <div key={concentration} className="flex items-center space-x-2">
                        <Checkbox
                          id={`concentration-${concentration}`}
                          checked={selectedConcentrations.includes(concentration)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedConcentrations([...selectedConcentrations, concentration]);
                            } else {
                              setSelectedConcentrations(selectedConcentrations.filter(c => c !== concentration));
                            }
                          }}
                        />
                        <label htmlFor={`concentration-${concentration}`} className="text-sm cursor-pointer">
                          {concentration}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes Filter */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Fragrance Notes</Label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {allFragranceNotes.slice(0, 15).map((note) => (
                      <div key={note} className="flex items-center space-x-2">
                        <Checkbox
                          id={`note-${note}`}
                          checked={selectedNotes.includes(note)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedNotes([...selectedNotes, note]);
                            } else {
                              setSelectedNotes(selectedNotes.filter(n => n !== note));
                            }
                          }}
                        />
                        <label htmlFor={`note-${note}`} className="text-sm cursor-pointer">
                          {note}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mood Filter */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Mood</Label>
                  <div className="space-y-2">
                    {moodCategories.slice(0, 6).map((mood) => (
                      <div key={mood} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mood-${mood}`}
                          checked={selectedMoods.includes(mood)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedMoods([...selectedMoods, mood]);
                            } else {
                              setSelectedMoods(selectedMoods.filter(m => m !== mood));
                            }
                          }}
                        />
                        <label htmlFor={`mood-${mood}`} className="text-sm cursor-pointer">
                          {mood}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {filteredPerfumes.length} Fragrances Found
                </h2>
                {searchQuery && (
                  <p className="text-muted-foreground">
                    Results for "{searchQuery}"
                  </p>
                )}
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviewed</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedBrands.map((brand) => (
                  <Badge key={`brand-${brand}`} variant="secondary" className="gap-1">
                    {brand}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setSelectedBrands(selectedBrands.filter(b => b !== brand))}
                    />
                  </Badge>
                ))}
                {selectedNotes.map((note) => (
                  <Badge key={`note-${note}`} variant="secondary" className="gap-1">
                    {note}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setSelectedNotes(selectedNotes.filter(n => n !== note))}
                    />
                  </Badge>
                ))}
                {selectedMoods.map((mood) => (
                  <Badge key={`mood-${mood}`} variant="secondary" className="gap-1">
                    {mood}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setSelectedMoods(selectedMoods.filter(m => m !== mood))}
                    />
                  </Badge>
                ))}
              </div>
            )}

            {/* Results Grid */}
            {filteredPerfumes.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPerfumes.map((perfume) => (
                  <PerfumeCard key={perfume.id} perfume={perfume} showFullDetails />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No fragrances found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearAllFilters} variant="outline">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}