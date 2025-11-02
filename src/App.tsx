import { useEffect, useState } from 'react';
import { TreeList } from './components/TreeList';
import { TreeDetail } from './components/TreeDetail';
import { supabase, Tree } from './lib/supabase';

function App() {
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      loadTreeByCode(code);
    }
  }, []);

  async function loadTreeByCode(code: string) {
    try {
      const { data, error } = await supabase
        .from('trees')
        .select('*')
        .eq('code', code)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setSelectedTree(data);
      }
    } catch (error) {
      console.error('Error loading tree:', error);
    }
  }

  return (
    <>
      <TreeList onTreeSelect={setSelectedTree} />
      {selectedTree && (
        <TreeDetail tree={selectedTree} onClose={() => setSelectedTree(null)} />
      )}
    </>
  );
}

export default App;
