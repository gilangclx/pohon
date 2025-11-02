import { Trees } from 'lucide-react';
import { Tree } from '../lib/supabase';

interface TreeCardProps {
  tree: Tree;
  onClick: () => void;
}

export function TreeCard({ tree, onClick }: TreeCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
    >
      <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
        {tree.image_url ? (
          <img
            src={tree.image_url}
            alt={tree.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Trees size={64} className="text-green-600" />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{tree.name}</h3>
        <p className="text-sm text-gray-600 italic mb-2">{tree.scientific_name}</p>
        <p className="text-sm text-gray-700 line-clamp-2">{tree.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full">
            {tree.family}
          </span>
          <span className="text-xs text-gray-500">#{tree.code}</span>
        </div>
      </div>
    </div>
  );
}
