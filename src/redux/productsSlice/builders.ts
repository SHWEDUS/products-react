import type { IProduct } from '../../models/IProduct';
import { type ProductSliceState} from './types';
import { WritableDraft } from "immer/src/types/types-external";
import { ActionReducerMapBuilder, AsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../../models/Status';

export const fetchProductsBuilder = (
	builder: ActionReducerMapBuilder<WritableDraft<ProductSliceState>>,
	fetch: AsyncThunk<any, any, any>,
) => {
	builder.addCase(fetch.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
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

export const fetchProductsByIdBuilder = (
	builder: ActionReducerMapBuilder<WritableDraft<ProductSliceState>>,
	fetch: AsyncThunk<any, any, any>,
) => {
	builder.addCase(fetch.fulfilled, (state, action: PayloadAction<IProduct>) => {
		state.item = action.payload;
		state.status = Status.SUCCESS;
	});
	builder.addCase(fetch.pending, (state) => {
		state.status = Status.LOADING;
		state.item = undefined;
	});
	builder.addCase(fetch.rejected, (state) => {
		state.status = Status.ERROR;
		state.item = undefined;
	});
};