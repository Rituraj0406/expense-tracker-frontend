import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';
import type { User, Preference } from './authTypes';

interface AuthState {
  user: User | null;
  preferences: Preference | null;
  loading: boolean;
  error: string | null;
}

// attempt to restore user from localStorage
const savedUser = localStorage.getItem('user');
const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  preferences: null,
  loading: false,
  error: null,
};

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }) => {
    console.log()
    const response = await API.post('/auth/login', data);
    // some backends wrap the user object, e.g. { user: {...}, token: '...' }
    const payload = response.data.user ? response.data.user : response.data;
    // ensure token is stored for later requests
    const token = payload.token ?? response.data.token;
    if (token) {
      localStorage.setItem('token', token);
    }
    return payload;
  }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: { name: string; email: string; password: string }) => {
    const response = await API.post('/auth/register', data);
    const payload = response.data.user ? response.data.user : response.data;
    const token = payload.token ?? response.data.token;
    if (token) {
      localStorage.setItem('token', token);
    }
    return payload;
  }
);

// update password
export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (
    data: { currentPassword: string, newPassword: string, confirmPassword: string }, { rejectWithValue }
  ) => {
    try {
      const response = await API.put('/auth/update-password', data);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update password")
    }
  }
)

// get profile details for the logged in user
export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("auth/profile");
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch profile")
    }
  }
)

// update profile - logged in user update details
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (data: { name?: string, email?: string, phone?: string, currency?: string, language?: string }, { rejectWithValue }) => {
    try {
      const response = await API.put("/auth/profile", data);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update profile")
    }
  }
)

// get preferences
export const getPreferences = createAsyncThunk(
  'auth/getPreferences',
  async (_, {rejectWithValue}) => {
    try {
      const res = await API.get('/auth/preferences');
      return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// update budget preference
export const updateBudgetPreferences = createAsyncThunk(
  'auth/updateBudgetPreference',
  async(data: {defaultBudget: number; rollover: boolean; warningThreshold: number}, {rejectWithValue}) => {
    try {
      const res = await API.put("auth/preferences/budget", data);
      return res.data.preferences;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
)

// updated appearance
// UPDATE appearance
export const updateAppearance = createAsyncThunk(
  "auth/updateAppearance",
  async (data: {
    theme: string;
    accentColor: string;
    density: string;
  }, { rejectWithValue }) => {
    try {
      const res = await API.put("/user/preferences/appearance", data);
      return res.data.preferences;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = 'Login failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
        state.error = 'Registration failed';
      })
      // get profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // update profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //update password
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // settings
      .addCase(getPreferences.fulfilled, (state, action) => {
        state.preferences = action.payload;
      })
      .addCase(updateBudgetPreferences.fulfilled, (state, action) => {
        state.preferences = action.payload;
      })
      .addCase(updateAppearance.fulfilled, (state, action) => {
        state.preferences = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;