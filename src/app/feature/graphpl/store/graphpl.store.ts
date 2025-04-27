import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { GraphqlService } from '../../../service';
import { of } from 'rxjs';
import { finalize, mergeMap } from 'rxjs/operators';
import { inject } from '@angular/core';

export interface GraphplStoreState {
  graphpl: {
    characters: null | any;
    // favoriteCharacter: null | any;
    // isIdOpen: null | any;
    // speciesCount: Record<string, number>;
    // typeCount: Record<string, number>;
  };
  loading: boolean;
  graphplError: null | string;
  graphplSuccess: null | string;
  isIdOpen: null | any;
}

const initialGraphplStoreState: GraphplStoreState = {
  graphpl: {
    characters: null,
    // favoriteCharacter: null,
    // isIdOpen: null,
    // speciesCount: {},
    // typeCount: {},
  },
  loading: false,
  graphplError: null,
  graphplSuccess: null,
  isIdOpen: null,
};

export const GRAPHPL_STORE = signalStore(
  { providedIn: 'root' },
  withState(initialGraphplStoreState),
  withMethods((store) => {
    const service = inject(GraphqlService);

    return {
      isOpenDetails(id: any) {
        console.log('isOpenDetails', id);

        patchState(store, { isIdOpen: id });
      },

      loadCharacters(filters: any = {}) {
        console.log('loadCharacters', filters);
        patchState(store, { loading: true });
        service.getCharacters(filters).pipe(
          finalize(() => patchState(store, { loading: false }))
        ).subscribe((response) => {
          console.log('response', response.characters);
          patchState(store, {
            graphpl: {
              ...store.graphpl,
              characters: response.characters
            }
          });
        });
      }
    };
  })
);
