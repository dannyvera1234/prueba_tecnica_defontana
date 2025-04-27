import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { GraphqlService } from '../../../service';
import { finalize } from 'rxjs/operators';
import { inject } from '@angular/core';

export interface GraphplStoreState {
  graphpl: {
    info: any | null;
    results: any | null;
    speciesCount: Record<string, number>;
    typeCount: Record<string, number>;
  };
  loading: boolean;
  isIdOpen: null | number;
  dataDetails: null | any;
  loadingDetails: boolean;
}

const initialGraphplStoreState: GraphplStoreState = {
  graphpl: {
    info: {},
    results: [],
    speciesCount: {},
    typeCount: {}
  },
  loading: false,
  isIdOpen: null,
  dataDetails: null,
  loadingDetails: false,
};

export const GRAPHPL_STORE = signalStore(
  { providedIn: 'root' },
  withState(initialGraphplStoreState),
  withMethods((store) => {
    const service = inject(GraphqlService);

    return {
      isOpenDetails(id: any) {
        patchState(store, { isIdOpen: id });
        if (id == null) return;
        this.getCharacter(id);
      },

      loadCharacters(filters: any = {}) {
        console.log('filters', filters);
        patchState(store, { loading: true });
        service.getCharacters(filters).pipe(
          finalize(() => patchState(store, { loading: false }))
        ).subscribe((response) => {
          console.log('response', response);
          // Contar las especies
          const speciesCount = response.characters.results.reduce((acc: Record<string, number>, character: any) => {
            const species = character.species || 'Desconocido';
            acc[species] = (acc[species] || 0) + 1;
            return acc;
          }, {});

          // Contar los tipos
          const typeCount = response.characters.results.reduce((acc: Record<string, number>, character: any) => {
            const type = character.type || 'Sin tipo';
            acc[type] = (acc[type] || 0) + 1;
            return acc;
          }, {});

          patchState(store, {
            graphpl: {
              ...store.graphpl,
              ...response.characters,
              speciesCount: speciesCount,
              typeCount: typeCount,
            }
          });
        });
      },

      getCharacter(id: number) {
        patchState(store, { loadingDetails: true });
        service.getCharacter(id).pipe(
          finalize(() => patchState(store, { loadingDetails: false }))
        ).subscribe((response) => {
          patchState(store, { dataDetails: response });
        });
      },
    };
  })
);
