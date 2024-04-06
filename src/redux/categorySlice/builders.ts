import { WritableDraft } from "immer/src/types/types-external";
import { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";
import { Status } from '../../models/Status';
import type { CategorySliceState } from './types';

export const fetchCategoriesBuilder = (
	builder: ActionReducerMapBuilder<WritableDraft<CategorySliceState>>,
	fetch: AsyncThunk<any, any, any>,
) => {
	builder.addCase(fetch.fulfilled, (state, action) => {
		state.items = action.payload;
		state.status = Status.SUCCESS;
	});
	builder.addCase(fetch.pending, (state) => {
		state.status = Status.LOADING;
		state.items = [];
	});
	builder.addCase(fetch.rejected, (state) => {
		state.status = Status.ERROR;
		state.items = [];
	});
};
