import { X, Trees, Leaf, MapPin, Pill, Ruler } from 'lucide-react';
import { Tree } from '../lib/supabase';

interface TreeDetailProps {
  tree: Tree;
  onClose: () => void;
}

export function TreeDetail({ tree, onClose }: TreeDetailProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full my-8 shadow-2xl animate-fadeIn">
        <div className="relative h-64 bg-gradient-to-br from-green-100 to-green-200 rounded-t-lg">
          {tree.image_url ? (
            <img
              src={tree.image_url}
              alt={tree.name}
              className="w-full h-full object-cover rounded-t-lg"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Trees size={96} className="text-green-600" />
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X size={24} className="text-gray-700" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{tree.name}</h2>
                <p className="text-lg text-gray-600 italic">{tree.scientific_name}</p>
              </div>
              <div className="bg-green-100 px-4 py-2 rounded-lg">
                <p className="text-sm text-gray-600">Kode</p>
                <p className="text-xl font-bold text-green-700">{tree.code}</p>
              </div>
            </div>
            <span className="inline-block bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              {tree.family}
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Trees size={24} className="text-green-600" />
                Deskripsi
              </h3>
              <p className="text-gray-700 leading-relaxed">{tree.description}</p>
            </div>

            {tree.height_range && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Ruler size={24} className="text-blue-600" />
                  Tinggi
                </h3>
                <p className="text-gray-700">{tree.height_range}</p>
              </div>
            )}

            {tree.characteristics && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Leaf size={24} className="text-green-600" />
                  Karakteristik
                </h3>
                <p className="text-gray-700 leading-relaxed">{tree.characteristics}</p>
              </div>
            )}

            {tree.habitat && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <MapPin size={24} className="text-red-600" />
                  Habitat
                </h3>
                <p className="text-gray-700 leading-relaxed">{tree.habitat}</p>
              </div>
            )}

            {tree.uses && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Pill size={24} className="text-purple-600" />
                  Kegunaan
                </h3>
                <p className="text-gray-700 leading-relaxed">{tree.uses}</p>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
