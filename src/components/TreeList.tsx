import { useEffect, useState } from 'react';
import { Trees, Search } from 'lucide-react';
import { supabase, Tree } from '../lib/supabase';
import { TreeCard } from './TreeCard';

interface TreeListProps {
  onTreeSelect: (tree: Tree) => void;
}

export function TreeList({ onTreeSelect }: TreeListProps) {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadTrees();
  }, []);

  async function loadTrees() {
    try {
      const { data, error } = await supabase
        .from('trees')
        .select('*')
        .order('name');

      if (error) throw error;
      setTrees(data || []);
    } catch (error) {
      console.error('Error loading trees:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredTrees = trees.filter(
    (tree) =>
      tree.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tree.scientific_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tree.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Trees size={48} className="text-green-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Memuat data pohon...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trees size={48} className="text-green-600" />
            <h1 className="text-4xl font-bold text-gray-800">Katalog Pohon</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jelajahi berbagai jenis pohon. Scan barcode pada pohon untuk melihat informasi lengkapnya.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari pohon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {filteredTrees.length === 0 ? (
          <div className="text-center py-12">
            <Trees size={64} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              {searchQuery ? 'Tidak ada pohon yang ditemukan' : 'Belum ada data pohon'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTrees.map((tree) => (
              <TreeCard key={tree.id} tree={tree} onClick={() => onTreeSelect(tree)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
