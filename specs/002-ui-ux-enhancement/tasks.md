# Premium UI/UX Tasks

- [ ] **Theme Infrastructure**
    - [ ] Update `src/theme/tokens.ts`
        - [ ] Add `shadows` object (sm, md, lg, xl).
        - [ ] Add `colors.premium` palette (backgrounds, accents).
        - [ ] Verify `spacing` and `radius` match premium feel.

- [ ] **Core Components**
    - [ ] Create `src/components/ui/FloatingInput.tsx`
        - [ ] Implement `Animated.Value` for label position/size.
        - [ ] Support `secureTextEntry` toggle.
        - [ ] Style with bottom border and theme colors.
    - [ ] Create `src/components/ui/AppHeader.tsx`
        - [ ] Props: `title`, `leftIcon`, `onLeftPress`, `rightIcon`, `onRightPress`, `badge`.
        - [ ] Style to match screen background.
    - [ ] Refactor `src/components/ui/AppCard.tsx`
        - [ ] Use new `shadows` tokens.
        - [ ] Ensure proper background colors for light/dark modes (if applicable) or premium surface.

- [ ] **Navigation**
    - [ ] Create `src/navigation/components/CustomTabBar.tsx`
        - [ ] Accept `BottomTabBarProps`.
        - [ ] Render styled `TouchableOpacity` for each tab.
        - [ ] Handle `onPress` and `onLongPress`.
        - [ ] Integreate `SafeAreaInsets`.
    - [ ] Update `src/navigation/TabNavigator.tsx`
        - [ ] Import and use `CustomTabBar`.
        - [ ] Update tab icons to use `Ionicons` (or similar) consistently.

- [ ] **Screen Migration**
    - [ ] Update `KitchenSinkScreen`
        - [ ] Add section for `FloatingInput`.
        - [ ] Add section for `AppHeader` demo.
        - [ ] Show `AppCard` with different shadow levels.
    - [ ] Update `LoginScreen` (if exists) or create demo Auth flow
        - [ ] Replace standard inputs with `FloatingInput`.
    - [ ] Update `HomeScreen`
        - [ ] Use `AppHeader`.
        - [ ] Check spacing and card layouts.

- [ ] **Verification**
    - [ ] Run `npm run android` / `ios`.
    - [ ] manual visual check of Tab Bar and Inputs.
