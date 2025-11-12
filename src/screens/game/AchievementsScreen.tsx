/**
 * Achievements Screen
 * Pantalla para ver todos los logros (desbloqueados y bloqueados)
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Heading1, Heading2, BodyText, SmallText, Button } from '@/components/ui';
import { Colors } from '@/constants';
import {
  Achievement,
  AchievementCategory,
  achievementTierColors,
  achievements,
  getAchievementsByCategory,
} from '@/constants/achievements';
import { achievementService } from '@/services/achievements/achievementService';
import { useUserStore } from '@/stores/userStore';

const CATEGORIES: { key: AchievementCategory; label: string; icon: string }[] = [
  { key: 'exploration', label: 'Exploración', icon: '🌍' },
  { key: 'education', label: 'Educación', icon: '🎓' },
  { key: 'social', label: 'Social', icon: '🤝' },
  { key: 'skill', label: 'Habilidad', icon: '⚡' },
  { key: 'collection', label: 'Colección', icon: '💎' },
  { key: 'special', label: 'Especial', icon: '✨' },
];

export const AchievementsScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | 'all'>('all');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { money, totalStars, addMoney, addStars } = useUserStore();

  // Get achievement stats
  const stats = achievementService.getAchievementStats();

  // Get filtered achievements
  const getFilteredAchievements = (): Achievement[] => {
    if (selectedCategory === 'all') {
      return achievements;
    }
    return getAchievementsByCategory(selectedCategory);
  };

  const filteredAchievements = getFilteredAchievements();

  // Handle achievement details
  const handleAchievementPress = (achievement: Achievement) => {
    const isUnlocked = achievementService.isUnlocked(achievement.id);
    const isClaimed = achievementService.isClaimed(achievement.id);

    // Only show hidden achievements if unlocked
    if (achievement.hidden && !isUnlocked && !isClaimed) {
      return;
    }

    setSelectedAchievement(achievement);
    setModalVisible(true);
  };

  // Handle claim rewards
  const handleClaimRewards = () => {
    if (!selectedAchievement) return;

    const rewards = achievementService.claimAchievement(selectedAchievement.id);

    if (rewards) {
      // Add rewards to user
      addMoney(rewards.coins);
      if (rewards.stars) {
        addStars(rewards.stars);
      }

      // Close modal
      setModalVisible(false);
      setSelectedAchievement(null);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Heading1>Logros</Heading1>
        <View style={styles.stats}>
          <View style={styles.statBox}>
            <Heading2 color={Colors.primary.main}>{stats.unlocked}</Heading2>
            <SmallText color={Colors.text.secondary}>Desbloqueados</SmallText>
          </View>
          <View style={styles.statBox}>
            <Heading2 color={Colors.success}>{stats.percentage}%</Heading2>
            <SmallText color={Colors.text.secondary}>Completado</SmallText>
          </View>
        </View>
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContainer}
      >
        <TouchableOpacity
          style={[
            styles.categoryTab,
            selectedCategory === 'all' && styles.categoryTabActive,
          ]}
          onPress={() => setSelectedCategory('all')}
        >
          <BodyText
            color={selectedCategory === 'all' ? Colors.primary.main : Colors.text.secondary}
          >
            Todos
          </BodyText>
        </TouchableOpacity>

        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.key}
            style={[
              styles.categoryTab,
              selectedCategory === category.key && styles.categoryTabActive,
            ]}
            onPress={() => setSelectedCategory(category.key)}
          >
            <BodyText style={styles.categoryIcon}>{category.icon}</BodyText>
            <SmallText
              color={
                selectedCategory === category.key
                  ? Colors.primary.main
                  : Colors.text.secondary
              }
            >
              {category.label}
            </SmallText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Achievement List */}
      <ScrollView style={styles.achievementList}>
        {filteredAchievements.map((achievement) => {
          const progress = achievementService.getProgress(achievement.id);
          const isUnlocked = achievementService.isUnlocked(achievement.id);
          const isClaimed = achievementService.isClaimed(achievement.id);

          // Hide hidden achievements if not unlocked
          if (achievement.hidden && !isUnlocked && !isClaimed) {
            return null;
          }

          const tierColor = achievementTierColors[achievement.tier];

          return (
            <TouchableOpacity
              key={achievement.id}
              style={[
                styles.achievementCard,
                { borderLeftColor: tierColor },
                isClaimed && styles.achievementClaimed,
              ]}
              onPress={() => handleAchievementPress(achievement)}
            >
              {/* Icon */}
              <View
                style={[
                  styles.achievementIcon,
                  !isUnlocked && !isClaimed && styles.achievementIconLocked,
                ]}
              >
                <Heading2>{achievement.icon}</Heading2>
              </View>

              {/* Content */}
              <View style={styles.achievementContent}>
                <BodyText
                  style={[
                    styles.achievementName,
                    !isUnlocked && !isClaimed && styles.textLocked,
                  ]}
                >
                  {achievement.name}
                </BodyText>
                <SmallText color={Colors.text.secondary} style={styles.achievementDescription}>
                  {achievement.description}
                </SmallText>

                {/* Progress bar */}
                {progress < 100 && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${progress}%`, backgroundColor: tierColor },
                        ]}
                      />
                    </View>
                    <SmallText color={Colors.text.tertiary}>{progress}%</SmallText>
                  </View>
                )}

                {/* Status badges */}
                <View style={styles.badges}>
                  {isUnlocked && !isClaimed && (
                    <View style={[styles.badge, { backgroundColor: Colors.success }]}>
                      <SmallText style={styles.badgeText}>¡Desbloquear!</SmallText>
                    </View>
                  )}
                  {isClaimed && (
                    <View style={[styles.badge, { backgroundColor: Colors.info }]}>
                      <SmallText style={styles.badgeText}>Completado</SmallText>
                    </View>
                  )}
                  <View style={[styles.badge, { backgroundColor: tierColor }]}>
                    <SmallText style={styles.badgeText}>{achievement.tier}</SmallText>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Icon */}
              <View style={styles.modalIcon}>
                <Heading1>{selectedAchievement.icon}</Heading1>
              </View>

              {/* Title */}
              <Heading2 style={styles.modalTitle}>{selectedAchievement.name}</Heading2>

              {/* Tier badge */}
              <View
                style={[
                  styles.modalTierBadge,
                  { backgroundColor: achievementTierColors[selectedAchievement.tier] },
                ]}
              >
                <BodyText style={styles.modalTierText}>
                  {selectedAchievement.tier.toUpperCase()}
                </BodyText>
              </View>

              {/* Description */}
              <BodyText color={Colors.text.secondary} style={styles.modalDescription}>
                {selectedAchievement.description}
              </BodyText>

              {/* Rewards */}
              <View style={styles.modalRewards}>
                <SmallText color={Colors.text.tertiary} style={styles.modalRewardsLabel}>
                  Recompensas:
                </SmallText>
                <View style={styles.modalRewardsList}>
                  {selectedAchievement.rewards.coins > 0 && (
                    <View style={styles.modalReward}>
                      <BodyText>💰 {selectedAchievement.rewards.coins} monedas</BodyText>
                    </View>
                  )}
                  {selectedAchievement.rewards.stars && (
                    <View style={styles.modalReward}>
                      <BodyText>⭐ {selectedAchievement.rewards.stars} estrellas</BodyText>
                    </View>
                  )}
                  {selectedAchievement.rewards.title && (
                    <View style={styles.modalReward}>
                      <BodyText>🏅 Título: {selectedAchievement.rewards.title}</BodyText>
                    </View>
                  )}
                  {selectedAchievement.rewards.specialItem && (
                    <View style={styles.modalReward}>
                      <BodyText>🎁 Item especial: {selectedAchievement.rewards.specialItem}</BodyText>
                    </View>
                  )}
                </View>
              </View>

              {/* Progress */}
              <View style={styles.modalProgress}>
                <SmallText color={Colors.text.tertiary}>
                  Progreso: {achievementService.getProgress(selectedAchievement.id)}%
                </SmallText>
              </View>

              {/* Actions */}
              <View style={styles.modalActions}>
                {achievementService.isUnlocked(selectedAchievement.id) && (
                  <Button
                    title="Reclamar Recompensas"
                    onPress={handleClaimRewards}
                    fullWidth
                  />
                )}
                <Button
                  title="Cerrar"
                  variant="outline"
                  onPress={() => setModalVisible(false)}
                  fullWidth
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    padding: 16,
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
  },
  statBox: {
    alignItems: 'center',
  },
  categoryScroll: {
    maxHeight: 60,
    marginBottom: 12,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  categoryTabActive: {
    backgroundColor: Colors.primary.light,
  },
  categoryIcon: {
    fontSize: 16,
  },
  achievementList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  achievementClaimed: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementIconLocked: {
    opacity: 0.4,
  },
  achievementContent: {
    flex: 1,
  },
  achievementName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 12,
    marginBottom: 8,
  },
  textLocked: {
    opacity: 0.5,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.background.tertiary,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: Colors.background.primary,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  modalTierBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
  },
  modalTierText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  modalDescription: {
    textAlign: 'center',
    marginBottom: 20,
  },
  modalRewards: {
    width: '100%',
    marginBottom: 16,
  },
  modalRewardsLabel: {
    marginBottom: 8,
    fontWeight: '600',
  },
  modalRewardsList: {
    gap: 8,
  },
  modalReward: {
    padding: 12,
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
  },
  modalProgress: {
    width: '100%',
    padding: 12,
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  modalActions: {
    width: '100%',
    gap: 12,
  },
});
