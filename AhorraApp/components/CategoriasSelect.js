import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { obtenerCategorias } from '../controllers/categoriasController';

export default function CategoriasSelect({ 
  usuarioId, 
  selectedCategoryId, 
  onSelectCategory, 
  color = 'gray',
  placeholder = 'Seleccionar categoría'
}) {
  const [categorias, setCategorias] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Obtener el nombre de la categoría seleccionada
  const selectedCategoryName = categorias.find(c => c.id === selectedCategoryId)?.nombre || placeholder;

  useEffect(() => {
    if (usuarioId) {
      cargarCategorias();
    }
  }, [usuarioId]);

  const cargarCategorias = async () => {
    try {
      setLoading(true);
      const data = await obtenerCategorias(usuarioId);
      setCategorias(data || []);
    } catch (error) {
      console.error('Error cargando categorías:', error);
      setCategorias([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = (categoryId, categoryName) => {
    onSelectCategory(categoryId, categoryName);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity 
        style={[styles.selectButton, { borderColor: color }]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={[styles.selectText, { color: selectedCategoryId ? '#333' : '#999' }]}>
          {selectedCategoryName}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar Categoría</Text>
            
            {loading ? (
              <Text style={styles.loadingText}>Cargando categorías...</Text>
            ) : categorias.length > 0 ? (
              <FlatList
                data={categorias}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.categoryItem,
                      selectedCategoryId === item.id && styles.categoryItemSelected,
                    ]}
                    onPress={() => handleSelectCategory(item.id, item.nombre)}
                    activeOpacity={0.6}
                  >
                    <Text style={[
                      styles.categoryItemText,
                      selectedCategoryId === item.id && styles.categoryItemTextSelected,
                    ]}>
                      {item.nombre}
                    </Text>
                  </TouchableOpacity>
                )}
                scrollEnabled={true}
              />
            ) : (
              <Text style={styles.noCategoriesText}>
                No hay categorías. Por favor crea una primero.
              </Text>
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  selectButton: {
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  selectText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  categoryItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryItemSelected: {
    backgroundColor: '#E3F2FD',
  },
  categoryItemText: {
    fontSize: 16,
    color: '#333',
  },
  categoryItemTextSelected: {
    color: '#2f80ed',
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 20,
  },
  noCategoriesText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 20,
    fontSize: 14,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#2f80ed',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
